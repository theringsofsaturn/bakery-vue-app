import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await user.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
