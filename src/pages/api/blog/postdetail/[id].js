import Posts from '@/serverConfig/model/post.model';
import mongoose from 'mongoose';
import { authMiddleware } from '../../../../serverConfig/_middleware';
import dbConnect from '../../../../serverConfig/connectionString';

dbConnect();

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        let query = [
          {
            $lookup: {
              from: 'users',
              let: { userId: { $toObjectId: '$userId' } },
              pipeline: [
                {
                  $match: { $expr: { $eq: ['$_id', '$$userId'] } }
                },
                {
                  $project: {
                    _id: 0,
                    role: 1,
                    email: 1,
                    fullName: 1
                  }
                }
              ],
              as: 'pblog'
            }
          },
          {
            $match: { _id: new mongoose.Types.ObjectId(req.query.id) }
          },
          { $limit: 1 }
        ];
        const postDetail = await Posts.aggregate(query);

        if (!postDetail) {
          return res.status(404).json({
            success: false,
            message: 'Post not found'
          });
        }

        return res.status(200).json({
          success: true,
          postData: Object.assign({}, ...postDetail)
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    case 'PUT':
      res.status(400).json({ message: 'PUT!' });
      break;
    default:
      res.status(400).json({ message: 'Not found!' });
      break;
  }
}
export default function apiHandler(req, res) {
  authMiddleware(req, res, () => handler(req, res));
}
