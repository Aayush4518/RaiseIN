import mongoose from "mongoose";
import { cover } from "three/src/extras/TextureUtils";

const UserSchema= new mongoose.Schema({
    name:{
        type: String, 
        
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profilePicture:{
        type: String,
    },
    coverPicture:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },


})
const user= mongoose.models.User || mongoose.model("User", UserSchema)
export default user