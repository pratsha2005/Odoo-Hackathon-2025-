import { Item } from "../models/item.models.js";

const addItem = async (req, res) => {
    try {
        const { description, redeemPoints, category, subcategory, size } = req.body;

        if (!description || !redeemPoints || !category || !subcategory || !size) {
            throw new Error("Require all fields");
        }
        const user = req.user;
        const item = await Item.create({
            uploader: user._id,
            description,
            redeemPoints,
            image: req.file?.buffer || null,
            category,
            subcategory,
            size
        });

    
        if(!item){
            throw new Error("Failed to create item")
        }
        const createdItem = await Item.findById(item._id)
        if(!createdItem){
            throw new Error("Failed to fetch item")
        }
        return res
        .status(201)
        .json({
            message: "Item created successfully",
            data: createdItem
        })
    }catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const getItemById = async(req, res) => {
    const { itemId } = req.params
    const item = await Item.findById(itemId).lean();

    if(!item){
        throw new Error("Item Id Invalid")
    }

    if (item.image) {
        item.image = item.image.toString('base64');
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
        }).populate('uploader', 'username profile').lean();

        if(!items){
            throw new Error("Some error occurred in getting items for user")
        }
        
        // Convert each image to base64
        items.forEach(item => {
            if (item.image) {
                item.image = item.image.toString('base64');
            }
        });

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
        const items = await Item.find().populate('uploader', 'profile username').lean();
        if(!items) {
            throw new Error("Some error occurred in getting all items")
        }

        // Convert each image to base64
        items.forEach(item => {
            if (item.image) {
                item.image = item.image.toString('base64');
            }
        });

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