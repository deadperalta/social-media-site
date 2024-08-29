import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      username :{
        type: String,
        required : true,
        unique : true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      posts : [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }],

      photo : {
        type : String,
      },
      followers : [
        {
          type : mongoose.Types.ObjectId,
          ref : "User"
        }
      ],
      
      following : [
        {
          type : mongoose.Types.ObjectId,
          ref : "User"
        }
      ]
});

export default mongoose.model("User", userSchema);