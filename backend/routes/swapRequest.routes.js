import { Router } from "express";
import {createSwapRequest, rejectRequest, acceptRequest} from "../controllers/swapRequest.controllers.js"
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router()
router.route("/createRequest").post(createSwapRequest)
router.route("/rejectRequest/:swapId").post(rejectRequest)
router.route("/acceptRequest/:swapId").post(acceptRequest)


export default router