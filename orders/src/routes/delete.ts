import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/orders';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@mikhaealtix/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  [
    body('orderId')
      .not()
      .isEmpty()
      .custom((input: string) => {
        return mongoose.Types.ObjectId.isValid(input);
      })
      .withMessage('orderId must be provided'),
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
