import { Router } from "express";
import {createSwapRequest} from "../controllers/swapRequest.controllers.js"
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router()
router.route("/createRequest").post(createSwapRequest)


export default router