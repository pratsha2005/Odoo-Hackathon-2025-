import { Router } from "express";
import {createSwapRequest, rejectRequest} from "../controllers/swapRequest.controllers.js"
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router()
router.route("/createRequest").post(createSwapRequest)
router.route("/rejectRequest/:swapId").post(rejectRequest)


export default router