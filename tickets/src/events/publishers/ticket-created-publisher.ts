import { Publisher, Subjects, TicketCreatedEvent } from '@ms-ticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
