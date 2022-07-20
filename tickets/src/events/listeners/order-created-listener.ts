import { Listener, OrderCreatedEvent, Subjects } from '@ms-ticket/common';
import { Message } from 'node-nats-streaming';
import { NotFoundError } from '@ms-ticket/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queueGroupName';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket throw an error
    if (!ticket) {
      throw new NotFoundError();
    }

    // Mark the ticket as reserved by setting it's orderId property
    ticket.set({ orderId: data.id });

    // save the ticket
    await ticket.save();

    const { id, price, title, userId, orderId, version } = ticket;
    new TicketUpdatedPublisher(this.client).publish({
      id: id,
      title: title,
      userId: userId,
      orderId: orderId,
      version: version,
      price: price,
    });

    // ack the message
    msg.ack();
  }
}
