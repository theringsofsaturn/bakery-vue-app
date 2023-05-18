import express from 'express';
import mongoose from 'mongoose';
import jsonwebtoken from './middleware/jsonwebtoken.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect('mongodb+srv://ishmael:dostojevski@cluster0.oqgfe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
