import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, 'secretKey');

    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default auth;
