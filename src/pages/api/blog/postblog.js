import Posts from '@/serverConfig/model/post.model';
import mongoose from 'mongoose';
import { upload } from '../../../serverConfig/multerupload';
import { authMiddleware } from '../../../serverConfig/_middleware';
import dbConnect from '../../../serverConfig/connectionString';

dbConnect();

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      try {
        upload.single('file')(req, res, async (err) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            const newFile = new Posts({
              filename: req?.file?.filename,
              path: req?.file?.path,
              userId: req?.body?.userId,
              title: req?.body?.title,
              content: req?.body?.content
            });

            const savedFile = await newFile.save();

            res.status(200).json({ success: true, file: savedFile });
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        upload.single('file')(req, res, async (err) => {
          if (err) {
            res.status(400).json(err.message);
          } else {
            const saveData = {
              filename: req?.file?.filename,
              path: req?.file?.path,
              // userId: req?.body?.userId,
              title: req?.body?.title,
              content: req?.body?.content
            };

            const updateData = await Posts.findOneAndUpdate(
              { _id: req?.query?.id },
              saveData,
              { new: true }
            );
            if (updateData) {
              res
                .status(200)
                .json({ message: 'updated successfully', updateData });
            } else {
              res.status(500).json({ message: 'somthing wrong1' });
            }
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      // delete a post
      const stringId = req.query?.id;
      let id = stringId.replace(/[{}]/g, '');
      try {
        const deleteData = await Posts.deleteOne({
          _id: new mongoose.Types.ObjectId(id)
        });

        if (deleteData) {
          res.status(200).json({
            success: true,
            message: 'Post deleted successfully!'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Post not found!'
          });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: 'Not found!' });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
};

export default function apiHandler(req, res) {
  authMiddleware(req, res, () => handler(req, res));
}
