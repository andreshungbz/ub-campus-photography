// User Schema and Model for User Accounts

import { Schema, model, models } from 'mongoose';

// create User schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email address already exists in database'],
    required: [true, 'Email address is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username is invalid',
    ],
  },
});

// check if model already exist, else create new User model
const User = models.User || model('User', UserSchema);

export default User;
