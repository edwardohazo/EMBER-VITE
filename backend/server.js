// EXPRESS
import connectDB from './config/dbConnection.js';
import path from 'path';
import express from 'express';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';

// Web socket
import http from 'http';
import { WebSocket } from './routes/webSocket.js';
import { Server } from 'socket.io';

connectDB();

const app = express();

// // Web socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: ['http://localhost:3000', 'https://ember-flip-flops-app.onrender.com'],
  methods: ['POST', 'PUT'],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://ember-flip-flops-app.onrender.com/',
    ],
  })
);

app.use('/images', express.static('images'));
app.use(express.static(path.join('public')));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Web socket
WebSocket(io);
app.set('port', process.env.PORT || 5000);
server.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
