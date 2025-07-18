import mongoose, {Schema} from "mongoose";

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        default: ""
    },
    redeemPoints: {
        type: Number,
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    availability: {
        type: String,
        enum: ["available", "swapped"]
    },
    category: {
        type: String,
        enum: ["Men", "Women", "Kids"]
    },
    size: {
        type: String,
        enum: ["S", "M", "L", "XL"]
    },
    subcategory: {
        type: String,
        enum: ["Bottomwear", "Topwear"]
    }
})

export const Item = mongoose.model("Item", itemSchema)