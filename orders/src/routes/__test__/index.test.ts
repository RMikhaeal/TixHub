import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  return ticket;
};

const createOrder = async (user: string[], ticketId: string) => {
  const order = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({
      ticketId,
    })
    .expect(201);

  return order;
};

it('fetches orders for specified user', async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signup();
  const userTwo = global.signup();

  createOrder(userOne, ticketOne.id);
  const { body: orderTwo } = await createOrder(userTwo, ticketTwo.id);
  const { body: orderThree } = await createOrder(userTwo, ticketThree.id);

  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderTwo.id);
  expect(response.body[1].id).toEqual(orderThree.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
