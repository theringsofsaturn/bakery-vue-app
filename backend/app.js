import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import authRouter from './routes/auth.js';
import productRouter from './routes/products.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/', authRouter);
app.use('/', productRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Allow images of up to 5MB
  },
  fileFilter: fileFilter,
});

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
