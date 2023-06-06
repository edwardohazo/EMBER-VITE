import dotenv from 'dotenv/config';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

// Stablishing connection with DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection SUCCESS');
  } catch (error) {
    console.error('MongoDB connection FAIL');
    process.exit(1);
  }
};

export default connectDB;
