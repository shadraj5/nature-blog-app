import JWT from 'jsonwebtoken';

export const jwtSign = (payload) => {
  const token = JWT.sign(payload, process.env.SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM
  });
  return token;
};

export const JwtVerify = (token) => {
  const verifyToken = JWT.verify(token, process.env.SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM
  });
  return verifyToken;
};
