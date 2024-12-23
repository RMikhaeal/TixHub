import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hello');
});

app.listen(process.env.AUTH_PORT, () => {
  console.log('Auth listening');
});
