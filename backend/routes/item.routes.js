import { Router } from "express";
import { addItem, getItemById, getItemByUser, getAllItems } from "../controllers/item.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router()

router.route("/addItem").post(auth, addItem)
router.route("/getItemById/:itemId").get(auth, getItemById)
router.route("/getItemByUser/:userId").get(auth, getItemByUser)
router.route("/getAllItems").get(getAllItems)

export default router