import Posts from '@/serverConfig/model/post.model';
import { authMiddleware } from '../../../serverConfig/_middleware';
import dbConnect from '../../../serverConfig/connectionString';

dbConnect();

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { id, comment } = req.body;

      try {
        const commentResult = await Posts.findOne({
          _id: id
        }).lean();

        if (!commentResult) {
          return res.status(404).json({
            success: false,
            message: 'comment id not found!'
          });
        }

        await Posts.updateOne(
          { _id: id },
          {
            $push: {
              comment: {
                cName: req.user.fullName,
                commentBy: req.user.email,
                message: comment,
                date: new Date()
              }
            }
          }
        );

        return res.status(200).json({
          success: true,
          message: 'Comment added successfully.'
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Internal server error!'
        });
      }
    case 'GET':
    // get only comments
    default:
      res.status(400).json({ message: 'Not found!' });
      break;
  }
}

export default function apiHandler(req, res) {
  authMiddleware(req, res, () => handler(req, res));
}
