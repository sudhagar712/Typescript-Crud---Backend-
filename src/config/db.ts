import mongoose from "mongoose";


const connectDB = async() => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI || "");
        console.log('MongoDb Connected successfully')

        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectDB