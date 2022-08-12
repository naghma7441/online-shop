const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  var { firstName, lastName, email, password } = req.body; //front end

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(404)
        .json({ Status: 'False', message: 'user already exist' });
    } else {
      const hash_password = await bcrypt.hash(password, 10);

      const data = await new User({
        firstName,
        lastName,
        email,
        password: hash_password,
      });
      const saveUser = await data.save();

      return res.status(200).json({ saveUser });
    }
  } catch (err) {
    console.log(err);
  }
};

const generateJwtToken = async (_id, role) => {
  const token = await jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};
const login = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === 'user') {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = await generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: 'Something went wrong',
        });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  });
};

module.exports = {
  signup,
  login,
};
