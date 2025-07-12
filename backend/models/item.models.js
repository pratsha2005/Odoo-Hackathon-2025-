import mongoose, {Schema} from "mongoose";

const itemSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        //required
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
    }
})

export const Item = mongoose.model("Item", itemSchema)