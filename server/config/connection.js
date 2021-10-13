const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/programming-permissions',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
=======
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vipass", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8

module.exports = mongoose.connection;
