const express = require('express');
const { signupAdmin, signinAdmin } = require('../controller/admin/admin.auth');
const { addtocartHandler } = require('../controller/cart.controller');
const {
  addCategory,
  getCategory,
  updateCategory,
} = require('../controller/category.controller');
const { addProductHandler } = require('../controller/product.controller');
const { signup, login } = require('../controller/user.controller');
const router = express.Router();
// router.post('/addProduct', addProduct);
router.post('/signup', signup);
router.post('/login', login);

router.post('/addCategory', addCategory);
router.post('/addProduct', addProductHandler);
router.post('/addcart', addtocartHandler);
router.get('/getCategory', getCategory);
router.post('/updateCategory', updateCategory);
router.post('/admin-login', signinAdmin);
router.post('/admin-signup', signupAdmin);

module.exports = router;
