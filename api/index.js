const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const mercadoPagoRoute = require("./routes/mercadoPago");

dontenv.config();

mongoose
  .connect("mongodb://localhost:27017/reactEcommerce")
  .then(console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

// app.get("/api/test", () => {
//   console.log("test is successfull");
// });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", mercadoPagoRoute);

app.listen(5000 || 8000, () => {
  console.log("Backend server is running");
});
