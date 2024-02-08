import jwt from "jsonwebtoken";
import { get } from "../controllers/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const userToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await get(userToken.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};
