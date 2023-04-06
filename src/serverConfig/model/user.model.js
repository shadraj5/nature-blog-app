///////////////////////////////////////////////////////// DEPENDENCIES /////////////////////////////////////////////////////////////////

import mongoose from 'mongoose';
const { Schema } = mongoose;

/////////////////////////////////////////////////////////// SCHEMA ///////////////////////////////////////////////////////////////////

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true
    },
    mobile: {
      type: String,
      require: true
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true
    },
    photoURL: {
      type: String
    },

    status: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

const Users = mongoose.models.user || mongoose.model('user', UserSchema);

export default Users;
