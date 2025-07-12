import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectDBInstance = await mongoose.connect
    } catch (error) {
      console.log("Error in connecting database: ", error)
      process.exit(1)  
    }
}

export default connectDB