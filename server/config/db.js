import mongoose from "mongoose";
import dotenv from 'dotenv'
const connectDB = async () => {
    dotenv.config()
    try {
        await mongoose.connect(`mongodb+srv://parvans:${process.env.MONGO_DB}@cluster0.bjj3bpu.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Database connected successfully");
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;
