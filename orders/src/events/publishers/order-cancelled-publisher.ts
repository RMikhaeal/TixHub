import { Publisher, OrderCancelledEvent, Subjects } from '@mikhaealtix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
