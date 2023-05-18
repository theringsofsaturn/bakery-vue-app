import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/authenticate.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
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

authRouter.post('/login', async (req, res) => {
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

authRouter.get('/profile', auth, async (req, res) => {
  // If auth middleware does not call next(), this code won't run
  try {
    const user = await User.findById(req.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default authRouter;
