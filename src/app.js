const express = require('express');
const connectDataBase = require('./db/connect');
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const env = require('dotenv');
const cors = require('cors');
env.config();

const app = express();
// app.use(express.bodyParser());
bodyParser.json();
bodyParser.raw();
bodyParser.text();
app.use(
  cors({
    origin: '*',
  })
);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  next();
});

bodyParser.urlencoded();
app.use(express.json());
const port = process.env.PORT || 2000;
app.use('/src/files', express.static('/src/files'));

app.use('/api', routes);
app.get('/', (req, res) => {
  return res.send('my first applications of backends');
});

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  connectDataBase();

  console.log(`app is running at ${port}`);
});
