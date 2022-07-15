import { Publisher, Subjects, TicketUpdatedEvent } from '@ms-ticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
