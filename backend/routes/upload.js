import express from 'express';
import multer from 'multer';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json(req.file.filename);
});

export default uploadRouter;
