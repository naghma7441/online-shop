const mongoose = require('mongoose');

const connectDataBase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`database connected successfully `);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDataBase;
