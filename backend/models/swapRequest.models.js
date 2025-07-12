import mongoose, {Schema} from "mongoose";

const swapSchema = mongoose.Schema({
    wanted: {
        type: Schema.Types.ObjectId,
        ref: "Item",
    },
    offered: {
        type: Schema.Types.ObjectId,
        ref: "Item",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    requester: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["completed", "pending", "rejected"],
        default: "pending"
    }
})

export const Swap = mongoose.model("Swap", swapSchema);