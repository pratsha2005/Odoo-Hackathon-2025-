import mongoose, {Schema} from "mongoose";

const itemSchema = mongoose.Schema({
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
        type: Boolean,
        default: true
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