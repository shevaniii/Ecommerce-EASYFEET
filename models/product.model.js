import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String , 
        required:true
    }, 
    brand:{
        type:String , 
    },
    price:{
        type: Number,
        required: true,
        defafult:0
    },
    image:{
        type:String,
        default:''
    },
    category:{
        type: String ,
        required: true
    }, 
    description:{
        type:String , 

    },
    countInStock:{
        type:Number, 
        required: true, 
        default: 0
    }

}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
export default Product