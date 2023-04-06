import Posts from '@/serverConfig/model/post.model';
import { authMiddleware } from '../../../serverConfig/_middleware';
import dbConnect from '../../../serverConfig/connectionString';

dbConnect();

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { page, limit, q } = req.query;
      try {
        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10)
        };

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
                    fullName: 1,
                    photoURL: 1
                  }
                }
              ],
              as: 'pblog'
            }
          },

          {
            $sort: {
              createdAt: -1
            }
          }
        ];

        if (q) {
          query.push({
            $match: {
              $or: [{ title: { $regex: new RegExp(q, 'i') } }]
            }
          });
        }

        const aggregate = Posts.aggregate(query);

        const postResult = await Posts.aggregatePaginate(aggregate, options);

        if (!postResult) {
          return res.status(400).json({
            success: true,
            message: 'No record found!'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Blog post fetched successfully.',
          ...postResult
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error
        });
      }
    default:
      res.status(400).json({ message: 'Not found!' });
      break;
  }
}
export default function apiHandler(req, res) {
  authMiddleware(req, res, () => handler(req, res));
}
