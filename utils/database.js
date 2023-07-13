// Utility Function to Connect to MongoDB Atlas Database

import mongoose from 'mongoose';

let isConnected = false;

export const connectMongoDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    return;
  }
  try {
    // connect to MongoDB Atlas cluster with connection string
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'ub-campus-photography',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
