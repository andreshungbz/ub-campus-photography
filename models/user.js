// User Schema and Model for User Accounts

import { Schema, model, models } from 'mongoose';

// create User schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email address already exists in database'],
    required: [true, 'Email address is required'],
  },
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
});

// check if model already exist, else create new User model
const User = models.User || model('User', UserSchema);

export default User;
