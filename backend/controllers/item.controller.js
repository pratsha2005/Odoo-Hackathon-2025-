import { Item } from "../models/item.models.js";
import { User } from "../models/user.models.js";

const addItem = async(req, res) => {
    const {description, redeemPoints} = req.body
    if(!description || !redeemPoints) {
        throw new Error("Require description and redeemPoints")
    }

    const item = await Item.create({
        description,
        redeemPoints,
    })
}