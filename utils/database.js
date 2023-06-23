import mongoose, { mongo } from 'mongoose';

let isConnected = false;

export const connectMongoDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('Connection to MongoDB is already established');
    return;
  }

  try {
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
