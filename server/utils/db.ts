import mongoose from 'mongoose';
require('dotenv').config();

// Ensure MONGO_URI is correctly loaded from the .env file
const dbUrl: string = process.env.MONGO_URI || '';

const connectDB = async () => {
    try {
        const data = await mongoose.connect(dbUrl);
        console.log(`Database connected with ${data.connection.host}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        // Retry connection after 5 seconds if the connection fails
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
