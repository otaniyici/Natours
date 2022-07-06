const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log('Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const { PORT } = process.env;

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });
// .catch((err) => console.log('ERROR'));

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
