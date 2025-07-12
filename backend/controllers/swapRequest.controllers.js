import { Swap } from "../models/swapRequest.models.js";
import { User } from "../models/users.models.js";
import { Item } from "../models/item.models.js";


const createSwapRequest = async(req, res) => {
    const {wantedId, offeredId, requesterId, ownerId} = req.body
    if(!wantedId || !offeredId || !requesterId || !ownerId){
        throw new Error("All fields are required")
    }
    const wanted = await Item.findById(wantedId)
    const offered = await Item.findById(offeredId)
    const requester = await User.findById(requesterId)
    const owner = await User.findById(ownerId)

    if(!wanted || !offered || !requester || !owner){
        throw new Error("All fields are required")
    }

    const swapRequest = await Swap.create({
        wanted,
        offered,
        requester,
        owner
    })

    if(!swapRequest){
        throw new Error("Swap request failed")
    }

    return res
    .status(201)
    .json({
        message: "Swap Request created successfully",
        data: swapRequest
    })
}


const rejectRequest = async (req, res) => {
    const {swapId} = req.params
    const swap = await Swap.findByIdAndDelete(swapId);

    if(!swap){
        throw new Error("Swap request not found")
    }
    return res
    .status(201)
    .json({
        message: "Swap Request rejected successfully",
    })

}

const acceptRequest = async(req, res) =>{
    const {swapId} = req.params
    const swap = await Swap.findById(swapId)
    if(!swap){
        throw new Error("Swap request not found")
    }
    // console.log(swap.wanted)   
    const wanted = await Item.findById(swap.wanted)
    const offered = await Item.findById(swap.offered)
    const requester = await User.findById(swap.requester)
    const owner = await User.findById(swap.owner)
    if(!wanted || !offered || !requester || !owner){
        throw new Error("Couldn't get all variables from swap request")
    }
    const updatedWanted = await Item.findByIdAndUpdate(
        swap.wanted,
        { uploader: requester, availability: "swapped" },   // fields to update
        { new: true } // returns the updated document
    );

    const updatedOffered = await Item.findByIdAndUpdate(
        swap.offered,
        { uploader: owner, availability: "swapped" },
        { new: true }
    )

    console.log(updatedOffered)
    console.log(updatedWanted)

    const updatedSwap = await Swap.findByIdAndUpdate(
        swapId,
        { status: "accepted" },
        { new: true }
    )

    if(!updatedSwap){
        throw new Error("Some error occurred in accepting swap")
    }

    return res
    .status(201)
    .json({
        message: "Swap Request accepted successfully",
        data: updatedSwap
    })
}

export {
    createSwapRequest,
    rejectRequest,
    acceptRequest
}

