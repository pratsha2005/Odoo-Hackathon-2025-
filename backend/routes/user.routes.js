import { Router } from "express"
import { registerUser, loginUser, logout } from "../controllers/user.controller.js"
import { auth } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logout)

export default router