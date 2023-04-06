import bcrypt from 'bcrypt';
import dbConnect from '@/serverConfig/connectionString';
import Users from '@/serverConfig/model/user.model';

dbConnect();

const handler = async (req, res) => {
  const { fullName, email, mobile, role, password } = req.body;
  //lets vlidate the data before a user
  //cheking id the user is already exists
  const emailExist = await Users.findOne({ email });
  if (emailExist)
    return res.status(302).json({ message: 'Already registered' });
  //cerate new user
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new Users({
    fullName,
    email,
    mobile,
    role,
    password: hashPassword
  });
  try {
    const saveuser = await user.save();
    res.send({ _id: user._id, message: 'user creted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
