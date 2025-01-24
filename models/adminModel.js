import mongoose, { Schema } from "mongoose";

const adminSchema= new Schema(
    {
        name:{type:String,required:false},
        email:{type:String,required:true,unique:true},
        phno:{type:String,required:true},
        password:{type:String,required:true},

    }
)

const adminModel =mongoose.model('admins',adminSchema)
export default adminModel
