import mongoose from 'mongoose';
import env from '../../../interfaces/config/env';
import { logger } from '../../utils/logger';

const connectDB = async () => {
    try {
        await mongoose.connect(env.CONNECTION_STRING as string);
        logger.info('MongoDB connected');
    } catch (error) {
        logger.info(`MongoDB connection error ${error}`);
        process.exit(1);
    }
};

export default connectDB;