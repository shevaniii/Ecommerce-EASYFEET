import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ msg: 'Product added successfully into the cart', cart });
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ msg: 'Something went wrong while adding to cart' });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { items: [] }); // return empty if no cart found
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ msg: 'Failed to fetch cart' });
  }
};

//Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    const productToRemoveId = req.params.productId;
    console.log(productToRemoveId)
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productToRemoveId
    );
    
    await cart.save();
    res.status(200).json({ msg: 'Item removed successfully', cart });
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    res.status(500).json({ msg: 'Failed to remove item from cart' });
  }
};
