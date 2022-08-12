const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const addtocartHandler = async (req, res) => {
  let { user, cartItems } = req.body;

  try {
    let cart = await Cart.findOne({ user: user });
    // console.log('cart', cart);
    const productId = cartItems[0].product;
    console.log('productId', productId);

    // console.log('cartfffghggh', cart);

    if (cart?.cartItems?.length) {
      // console.log('card already exist', cart);
      const indexFound = cart.cartItems.findIndex(
        (item) => item.product.valueOf() === productId
      );
      if (indexFound !== -1) {
        console.log('before', cart.cartItems[indexFound].quantity);
        console.log('quantity select by user', cartItems[0].quantity);
        cart.cartItems[indexFound].quantity =
          cart.cartItems[indexFound].quantity + cartItems[0].quantity;
        console.log('<----', cart.cartItems[indexFound].quantity);
        const result = await cart.save();

        return res.status(200).json({ statu: 'Success', result });
      } else {
        console.log('ghghguuuuii', cartItems);
        console.log(JSON.stringify(cartItems));
        console.log(...cartItems);
        cart.cartItems.push(...cartItems);

        //cart.cartItems.concat(...cartItems);
        console.log('this is cart object..', JSON.stringify(cart));

        const result = await cart.save();

        return res.status(200).json({ statu: 'Success', result });
      }
    } else {
      const cart = await new Cart({
        user,
        cartItems,
      });

      const result = await cart.save();
      return res.status(200).json({ statu: 'Success', result });
    }
  } catch (err) {
    return res.status(404).json({ statu: 'fail', err });
  }
};

module.exports = {
  addtocartHandler,
};
