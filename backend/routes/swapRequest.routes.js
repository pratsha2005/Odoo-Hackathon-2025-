import { Router } from "express";
import {createSwapRequest, rejectRequest, acceptRequest, swapWithRedeemPoints} from "../controllers/swapRequest.controllers.js"
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router()
router.route("/createRequest").post(createSwapRequest)
router.route("/rejectRequest/:swapId").post(rejectRequest)
router.route("/acceptRequest/:swapId").post(acceptRequest)
router.route("/redeemPoints/:swapId").post(swapWithRedeemPoints)


export default router