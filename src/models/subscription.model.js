import mongoose from "mongoose"


const subscriptionSchema = mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "User" // list of user who subscribed this channel
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "User" //list of channel which users are subscribing
    },

}, { timestapms: true })


export const Subscription = new mongoose.model("Subscription", subscriptionSchema)