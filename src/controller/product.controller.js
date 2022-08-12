const Product = require('../models/product.model');

const addProductHandler = async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await new Product({
      name,
      price,
    });
    const result = await product.save();
    return res.status(200).json({ statu: 'Success', result });
  } catch (err) {
    return res.status(404).json({ statu: 'fail', err });
  }
};

module.exports = {
  addProductHandler,
};
