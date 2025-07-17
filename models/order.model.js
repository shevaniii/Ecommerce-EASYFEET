import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    items:[
        {
        product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
       },
       quantity:{
        type:Number,
        default: '0',
        required: true
       }
    }
],
totalPrice: {
    type:Number, 
    required:true
},
status:{
    type:String , 
    enum:['Pending', 'Shipped' , 'Delivered'],
    default: 'Pending'
}},
{timestamps:true})

const Order = mongoose.model('Order', orderSchema);

export default Order;