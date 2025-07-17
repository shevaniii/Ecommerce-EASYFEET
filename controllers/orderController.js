import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"; 


export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id; // ✅ Use correct ID
    // console.log("in order controller userId is ", userId);

    const { buyNow, productId, quantity } = req.body;
    let items = [];
    let totalPrice = 0;

    if (buyNow && productId) {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ msg: "Product not found" });

      if (product.countInStock < quantity) {
        return res.status(400).json({ msg: "Insufficient stock" });
      }

      items.push({ product: productId, quantity });
      totalPrice = product.price * quantity;
    } else {
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ msg: "Cart is empty" });
      }

      items = cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      totalPrice = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      await Cart.findOneAndDelete({ user: userId });
    }

    // ✅ Use correct key name
    const order = new Order({ user: userId, items, totalPrice });
    // console.log("in ordercontroller totalPrice is", totalPrice);
    await order.save();

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user._id || req.user.id; // ✅ Use correct ID
  const orders = await Order.find({ user: userId }).populate('items.product');
  res.json(orders);
};
