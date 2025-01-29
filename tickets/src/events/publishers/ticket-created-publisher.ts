import { Subjects, Publisher, TicketCreatedEvent } from '@mikhaealtix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
