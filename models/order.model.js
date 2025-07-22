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
        default: 1,
        required: true
       }
    }
],
totalPrice: {
    type:Number, 
    required:true
},
shippingAddress: {
    type: String,
    required: true
},
phoneNumber: {
    type: String,
    required: true
},
status:{
    type:String , 
    enum:['Pending', 'Shipped' , 'Delivered', 'Cancelled'],
    default: 'Pending'
}},
{timestamps:true})

const Order = mongoose.model('Order', orderSchema);

export default Order;