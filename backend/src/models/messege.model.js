import mongoose from "mongoose"
const messegeSchema =new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        reciverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
            default:""
        },
    },
    {timestamps:true});







const Messege = mongoose.model("Messege",messegeSchema);

export default Messege;