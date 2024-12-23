import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    // required: true,
    // unique: true,
  },
  displayName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
 
  profilePicture: {
    type: String,
  },
  provider: {
    type: String,
    default: 'google',
  },
}, { timestamps: true });

export const User = mongoose.model('users ', userSchema);

// export default User;