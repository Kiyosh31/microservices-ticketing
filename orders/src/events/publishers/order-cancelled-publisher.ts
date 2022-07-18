import { Publisher, OrderCancelledEvent, Subjects } from '@ms-ticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
