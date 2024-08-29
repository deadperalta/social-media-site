import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    likes : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    dislikes : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    comments : [
        {
            comment : { type : String},
            user : {
                type : mongoose.Types.ObjectId,
                ref : "User"
            }
        }
    ],
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
},
{timestamps:true});

export default mongoose.model("Post",postSchema);
