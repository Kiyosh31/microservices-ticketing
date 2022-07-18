import { Publisher, OrderCreatedEvent, Subjects } from '@ms-ticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
