///////////////////////////////////////////////////// Dependencies /////////////////////////////////////////////////////////////////

import { JwtVerify } from './jwt';

// Middleware to check valid user and attach userdetails.
export const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = JwtVerify(token);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
