import bcrypt from 'bcrypt';
import dbConnect from '@/serverConfig/connectionString';
import Users from '@/serverConfig/model/user.model';
import { jwtSign } from '@/serverConfig/jwt';
import cookie from 'cookie';

dbConnect();

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await Users.findOne({ email }).lean();
    if (!userDetails)
      return res.status(404).send({ message: 'user not found' });

    const isPasswordValid = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtSign({
      _id: userDetails._id,
      email: userDetails.email,
      role: userDetails.role,
      mobile: userDetails.mobile,
      fullName: userDetails.fullName
    });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600, // Expires in 1 hour
        path: '/'
      })
    );
    return res
      .setHeader('token', token)
      .send({ token: token, message: 'Successfully login' });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export default handler;
