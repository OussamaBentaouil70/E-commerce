const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const api = process.env.API_URL;
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const multer = require("multer");

app.use(cors());
app.options("*", cors());
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
//app.use(errorHandler());
app.use((err, req, res, next) => {
  if (err) {
    return res.json({ message: "the user is not authorized" });
  }
});
//routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const res = require("express/lib/response");

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running http://localhost:3000");
});
