import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bearerToken from "express-bearer-token";
import userRoute from "./src/app/routes/user.js";
import authRoute from "./src/app/routes/auth.js";
import authAddress from "./src/app/routes/address.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/address", authAddress);

app.get("/", (_, res) => {
  return res.send("Sistem Working");
});

app.listen(4000, async () => {
  console.log("Server working in PORT 4000");
});
