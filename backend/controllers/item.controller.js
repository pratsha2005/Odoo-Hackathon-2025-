import { Item } from "../models/item.models.js";


const addItem = async(req, res) => {
    const {description, redeemPoints} = req.body
    if(!description || !redeemPoints) {
        throw new Error("Require description and redeemPoints")
    }
    const user = req.user

    const item = await Item.create({
        uploader: user._id,
        description,
        redeemPoints,
    })
    if(!item){
        throw new Error("Failed to create item")
    }
    return res
    .status(201)
    .json({
        message: "Item created successfully",
        data: item.schema
    })
}

const getItemById = async(req, res) => {
    const { itemId } = req.params
    const item = await Item.findById(itemId)

    if(!item){
        throw new Error("Item Id Invalid")
    }

    return res
    .status(200)
    .json({
        message: "Item received successfully",
        data: item
    })
}

const getItemByUser = async(req, res) => {
    try {
        const {userId} = req.params
        const items = await Item.find({
            uploader: userId
        }).populate('uploader', 'username profile')

        if(!items){
            throw new Error("Some error occurred in getting items for user")
        }

        return res
        .status(200)
        .json({
            message: "Items received successfully",
            data: items
        })


    } catch (error) {
        console.log("Error occurred in getting Items for user", error)
    }
}

const getAllItems = async(req, res) => {
    try {
        const items = await Item.find().populate('uploader', 'profile username')
        if(!items) {
            throw new Error("Some error occurred in getting all items")
        }

        return res
        .status(200)
        .json({
            message: "items received successfully",
            data: items
        })

    } catch (error) {
        console.log("Some error occurred in getting all items", error)
    }
}

export {
    addItem,
    getItemById,
    getItemByUser,
    getAllItems
}