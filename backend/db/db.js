import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MONGODB Connected');
    } catch (error) {
        console.error('MONGODB Connection Err');
    }
}

export default connectDB