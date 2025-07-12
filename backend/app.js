import express from "express"
import cookieParser from "cookie-parser"; // to perform CRUD operation in user browser cookies
import cors from "cors";


const app = express();
// cors middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit: '16kb'
})) // to take data in form of json
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))  //to take data from url

// cookieParser middleware
app.use(cookieParser())






//routes
import authRoutes from "./routes/user.routes.js"
app.use("/api/v1/auth", authRoutes)

export {app}