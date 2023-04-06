import dbConnect from '@/serverConfig/connectionString';
import { authMiddleware } from '../../serverConfig/_middleware';
import Users from '@/serverConfig/model/user.model';

dbConnect();
const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      //  create logic for get user
      try {
        const userDetails = await Users.findOne(
          { email: req.user?.email, status: 1 },
          { __v: 0 }
        ).lean();

        if (!userDetails) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        return res.status(200).json({
          success: true,
          userDetails
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    // end logic for get user
    case 'PUT':
    // user updated logic
    // end user updated logic
    default:
      res.status(400).json({ message: 'Not found!' });
      break;
  }
};

export default function apiHandler(req, res) {
  authMiddleware(req, res, () => handler(req, res));
}
