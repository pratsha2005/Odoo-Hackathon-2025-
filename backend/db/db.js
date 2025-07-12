import mongoose from "mongoose";
const DB_NAME = "pratsha2005"

const connectDB = async () => {
    try {
        const connectDBInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
      console.log("Error in connecting database: ", error)
      process.exit(1)  
    }
}

export default connectDB