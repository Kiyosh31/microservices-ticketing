import { Listener, OrderCancelledEvent, Subjects } from '@ms-ticket/common';
import { Message } from 'node-nats-streaming';
import { NotFoundError } from '@ms-ticket/common';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './queueGroupName';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    ticket.set({ orderId: undefined });
    await ticket.save();

    const { id, orderId, userId, price, title, version } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id: id,
      orderId: orderId,
      userId: userId,
      price: price,
      title: title,
      version: version,
    });

    msg.ack();
  }
}
