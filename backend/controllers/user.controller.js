import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken"

const options = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
}

const registerUser = async (req, res) => {
    const {username, email, password, isAdmin} = req.body 
    //verification
    if([username, email, password].some((field) => field?.trim() === "")){
        throw new Error("Please fill in all fields")
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if(existedUser){
        throw new Error("User already exist")
    }

    const user = await User.create({
        username: username,
        email,
        password,
        isAdmin
    })


    
    const createdUser = User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new Error("Something went wrong while registering user")
    }

    const token = jwt.sign({userId: createdUser._id}, process.env.JSONSECRETKEY)

    return res
    .status(201)
    .cookie("jwt", token, options)
    .json({
        message: "User created successfully",
        data: createdUser.schema,
        token: token
    })
    
}

const loginUser = async (req, res) => {

    const {password, email} = req.body
    if(!password && !email){
        throw new Error("All fields are required")
    }
    const user = await User.findOne({
        $or: [{ email }]
    })
    if (!user){
        throw new Error("Unauthorised request")
    }
    const validPassword = await user.isPasswordCorrect(password)
    if(!validPassword){
        throw new Error("Wrong Password")
    }
    
    const loggedInUser = await User.findById(user._id).select("-password")

    const token = jwt.sign({userId: loggedInUser._id}, process.env.JSONSECRETKEY)

    
    return res
    .status(200)
    .cookie("jwt", token, options)
    .json({
        message: "User logged in successfully",
        data: loggedInUser,
        token: token
    })
}

const logout = async (req, res, next) => {
    res
    .status(200)
    .clearCookie('jwt', { path: '/' })
    .json({
        message: "User logged out successfully"
    })
}

export {
    registerUser,
    loginUser,
    logout
}