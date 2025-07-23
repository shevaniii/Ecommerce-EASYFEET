import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
 import Product from "../models/product.model.js";


export const createOrder = async (req, res) => {
  try {
       const userId = req.user._id || req.user.id;
     const { buyNow, productId, quantity, address, phone } = req.body;
 
     // Validate required fields
     if (!address || !phone) {
       return res.status(400).json({ msg: "Address and phone number are required" });
     }
    let items = [];
    let totalPrice = 0;

    if (buyNow && productId) {
        // Buy Now functionality
       if (!quantity || quantity <= 0) {
         return res.status(400).json({ msg: "Valid quantity is required" });
       }
 
      const product = await Product.findById(productId);
      if (!product) {
         return res.status(404).json({ msg: "Product not found" });
       }
 

      if (product.countInStock < quantity) {
         return res.status(400).json({ 
           msg: `Only ${product.countInStock} items available in stock` 
         });
       }

      items.push({ product: productId, quantity });
      totalPrice = product.price * quantity;
        // Update product stock
       product.countInStock -= quantity;
       await product.save();
    } else {
         // Cart to Order functionality
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ msg: "Cart is empty" });
      }

       // Validate stock for all items
       for (const item of cart.items) {
         if (!item.product) {
           return res.status(400).json({ msg: "Some products in cart are no longer available" });
         }
         
         if (item.product.countInStock < item.quantity) {
           return res.status(400).json({ 
             msg: `Insufficient stock for ${item.product.name}. Only ${item.product.countInStock} available` 
           });
         }
       }
 
       // Prepare order items and update stock
       for (const item of cart.items) {
         items.push({
           product: item.product._id,
           quantity: item.quantity,
         });
 
         // Update product stock
         const product = await Product.findById(item.product._id);
         product.countInStock -= item.quantity;
         await product.save();
       }

      totalPrice = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
 // Clear cart after successful order
      await Cart.findOneAndDelete({ user: userId });
    }

     // Create order
     const order = new Order({ 
       user: userId, 
       items, 
       totalPrice,
       shippingAddress: address,
       phoneNumber: phone 
     });
    await order.save();
        await order.populate('items.product');

    res.status(201).json({ 
       msg: "Order placed successfully", 
       order,
       success: true 
     });
  } catch (error) {
    console.error("Error in createOrder:", error);
        res.status(500).json({ msg: "Failed to create order. Please try again." });
  }
};


export const getOrders = async (req, res) => {
 try {
     const userId = req.user._id || req.user.id;
     
     const orders = await Order.find({ user: userId })
       .populate('items.product')
       .sort({ createdAt: -1 }); // Most recent first
 
     res.status(200).json({ orders, success: true });
   } catch (error) {
     console.error("Error in getOrders:", error);
     res.status(500).json({ msg: "Failed to fetch orders" });
   }
 };
 
 export const getOrderById = async (req, res) => {
   try {
     const { orderId } = req.params;
     const userId = req.user._id || req.user.id;
 
     const order = await Order.findOne({ _id: orderId, user: userId })
       .populate('items.product');
 
     if (!order) {
       return res.status(404).json({ msg: "Order not found" });
     }
 
     res.status(200).json({ order, success: true });
   } catch (error) {
     console.error("Error in getOrderById:", error);
     res.status(500).json({ msg: "Failed to fetch order details" });
   }
 };
  export const updateOrderStatus = async (req, res) => {
   try {
     const { orderId } = req.params;
     const { status } = req.body;
     
     const validStatuses = ['Pending', 'Shipped', 'Delivered'];
     if (!validStatuses.includes(status)) {
       return res.status(400).json({ msg: "Invalid status" });
     }
 
     const order = await Order.findByIdAndUpdate(
       orderId,
       { status },
       { new: true }
     ).populate('items.product');
 
     if (!order) {
       return res.status(404).json({ msg: "Order not found" });
     }
 
     res.status(200).json({ 
       msg: "Order status updated successfully", 
       order,
       success: true 
     });
   } catch (error) {
     console.error("Error in updateOrderStatus:", error);
     res.status(500).json({ msg: "Failed to update order status" });
   }
 };
