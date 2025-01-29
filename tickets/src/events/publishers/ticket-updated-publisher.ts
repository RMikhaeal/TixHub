import { Subjects, Publisher, TicketUpdatedEvent } from '@mikhaealtix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
