import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bearerToken from "express-bearer-token";
import userRoute from "./src/app/routes/user.js";
import authRoute from "./src/app/routes/auth.js";
import addressRoute from "./src/app/routes/address.js";
import productRoute from "./src/app/routes/product.js";
import categoryRoute from "./src/app/routes/category.js";
import uploadImgRoute from "./src/app/routes/imgProducts.js";
import ordersRoute from "./src/app/routes/orders.js";
import orderProductRoute from "./src/app/routes/orderProduct.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/address", addressRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/upload-productsimg", uploadImgRoute);
app.use("/orders", ordersRoute);
app.use("/order-product", orderProductRoute);

app.get("/", (_, res) => {
  return res.send("Sistem Working");
});

app.listen(4000, async () => {
  console.log("Server working in PORT 4000");
});
