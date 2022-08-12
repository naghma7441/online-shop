const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

const signupAdmin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: 'Admin already registered',
      });
    console.log(User.estimatedDocumentCount());
    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = 'admin';
      if (count === 0) {
        role = 'super-admin';
      }

      const { firstName, lastName, email, password, username } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        password: hash_password,
        username,
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: 'Something went wrong',
          });
        }

        if (data) {
          return res.status(201).json({
            message: 'Admin created Successfully..!',
          });
        }
      });
    });
  });
};

const signinAdmin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (
        isPassword &&
        (user.role === 'admin' || user.role === 'super-admin')
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie('token', token, { expiresIn: '1d' });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: 'Invalid Password',
        });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  });
};

const signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully...!',
  });
};

module.exports = {
  signupAdmin,
  signinAdmin,
  signout,
};
