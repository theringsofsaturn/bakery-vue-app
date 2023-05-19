import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productRouter from './routes/products.js';
import uploadRouter from './routes/upload.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/', authRouter);
app.use('/', productRouter);
app.use('/', uploadRouter);
// app.use('/images', express.static('images'));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose
  .connect('mongodb+srv://ishmael:dostojevski@cluster0.oqgfe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
