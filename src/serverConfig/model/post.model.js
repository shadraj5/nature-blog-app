///////////////////////////////////////////////////////// DEPENDENCIES /////////////////////////////////////////////////////////////////

import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const { Schema } = mongoose;

/////////////////////////////////////////////////////////// SCHEMA ///////////////////////////////////////////////////////////////////

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    filename: {
      type: String
    },
    path: {
      type: String
    },
    comment: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

PostSchema.plugin(aggregatePaginate);

const Posts =
  mongoose.models.postblog || mongoose.model('postblog', PostSchema);

export default Posts;
