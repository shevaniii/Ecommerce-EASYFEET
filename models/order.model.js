import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        rquired: true
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
    rquired:true
},
status:{
    type:String , 
    enum:['Pending', 'Shipped' , 'Delivered'],
    default: 'Pending'
}},
{timestamps:true})

const Order = mongoose.model('Order', orderSchema);

export default Order;