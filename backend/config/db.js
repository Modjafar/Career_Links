import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.NODE_ENV === 'production'
            ? process.env.MONGODB_PROD_URI
            : process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error('MongoDB URI not found in environment variables');
        }

        const conn = await mongoose.connect(mongoURI);


        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
