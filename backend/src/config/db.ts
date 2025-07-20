import mongoose from "mongoose";

export const connectdb = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/bidzo')
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}


