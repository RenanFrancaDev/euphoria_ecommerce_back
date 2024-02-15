import { Router } from "express";
import { login, register } from "../controllers/auth.js";

// import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    console.log("foi");
    const data = await login(req.body);
    res.status(200).json({ data });
  } catch {
    res.status(500).json(error);
  }
});

//Package express bearer token to send req.token

router.post("/register", async (req, res) => {
  try {
    const data = await register(req.body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
