import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Add to Cart
export const addToCart = async (req, res) => {
  try {
        const { productId, quantity = 1 } = req.body;
     const userId = req.user._id || req.user.id; // Ensure userId is correctly set from the authenticated user

     // Validate input
     if (!productId) {
       return res.status(400).json({ msg: 'Product ID is required' });
     }
 
     if (quantity <= 0) {
       return res.status(400).json({ msg: 'Quantity must be greater than 0' });
     }
 
     // Check if product exists
     const product = await Product.findById(productId);
     if (!product) {
       return res.status(404).json({ msg: 'Product not found' });
     }
 
     // Check stock availability
     if (product.countInStock < quantity) {
       return res.status(400).json({ msg: 'Insufficient stock available' });
     }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Check total quantity after adding
       const newQuantity = cart.items[itemIndex].quantity + quantity;
       if (product.countInStock < newQuantity) {
         return res.status(400).json({ msg: 'Not enough stock for this quantity' });
       }
       cart.items[itemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
     await cart.populate('items.product');
     
     res.status(200).json({ 
       msg: 'Product added successfully to cart', 
       cart,
       success: true 
     });
  } catch (error) {
  console.error('Error in addToCart:', error);
  res.status(500).json({ msg: 'Something went wrong while adding to cart', error: error.message });
}

};

// Get Cart
export const getCart = async (req, res) => {
  try {
 const userId = req.user._id;
     const cart = await Cart.findOne({ user: userId }).populate('items.product');
     
     if (!cart) {
       return res.json({ items: [], totalItems: 0, totalPrice: 0 });
     }
 
     // Calculate totals
     const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
     const totalPrice = cart.items.reduce(
       (sum, item) => sum + (item.product?.price || 0) * item.quantity,
       0
     );
 
     res.json({
       items: cart.items,
       totalItems,
       totalPrice,
       _id: cart._id
     });  
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ msg: 'Failed to fetch cart' });
  }
};



//Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
     const productToRemoveId = req.params.productId;
 
     if (!productToRemoveId) {
       return res.status(400).json({ msg: 'Product ID is required' });
     }
 
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

     const itemExists = cart.items.some(
       (item) => item.product.toString() === productToRemoveId
     );
 
     if (!itemExists) {
       return res.status(404).json({ msg: 'Item not found in cart' });
     }
 
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productToRemoveId
    );
    
    await cart.save();
     await cart.populate('items.product');
     
     res.status(200).json({ 
       msg: 'Item removed successfully', 
       cart,
       success: true 
     });
 
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    res.status(500).json({ msg: 'Failed to remove item from cart' });
  }
};

 // Clear entire cart
 export const clearCart = async (req, res) => {
   try {
     const userId = req.user._id;
     
     const cart = await Cart.findOne({ user: userId });
     if (!cart) {
       return res.status(404).json({ msg: 'Cart not found' });
     }
 
     cart.items = [];
     await cart.save();
 
     res.status(200).json({ msg: 'Cart cleared successfully', cart });
   } catch (error) {
     console.error('Error in clearCart:', error);
     res.status(500).json({ msg: 'Failed to clear cart' });
   }
 };

// Update Cart Item Quantity
 export const updateCartQuantity = async (req, res) => {
   try {
     const { productId } = req.params;
     const { quantity } = req.body;
     const userId = req.user._id;
 
     if (quantity <= 0) {
       return res.status(400).json({ msg: 'Quantity must be greater than 0' });
     }
 
  const cart = await Cart.findOne({ user: userId });
     if (!cart) {
       return res.status(404).json({ msg: 'Cart not found' });
     }
 
     const itemIndex = cart.items.findIndex(
       (item) => item.product.toString() === productId
     );
 
     if (itemIndex === -1) {
       return res.status(404).json({ msg: 'Item not found in cart' });
     }
 
     // Check stock availability
     const product = await Product.findById(productId);
     if (product.countInStock < quantity) {
       return res.status(400).json({ msg: 'Insufficient stock available' });
     }
 
     cart.items[itemIndex].quantity = quantity;
     await cart.save();
     await cart.populate('items.product');
 
     res.status(200).json({ msg: 'Cart updated successfully', cart });
   } catch (error) {
     console.error('Error in updateCartQuantity:', error);
     res.status(500).json({ msg: 'Failed to update cart' });
   }
 };
 
