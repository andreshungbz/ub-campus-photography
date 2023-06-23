import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email exists'],
    required: [true, 'Email exists'],
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid',
    ],
  },
});

// check if model already exists
const User = models.User || model('User', UserSchema);

export default User;
