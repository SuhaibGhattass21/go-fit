import mongoose from 'mongoose';
import env from './env';

const connectDB = async () => {
    try {
        await mongoose.connect(env.CONNECTION_STRING as string);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;