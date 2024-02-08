import { Router } from "express";
import { getAll, get, save, update, remove } from "../controllers/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Package express bearer token to send req.token

router.get("/:id", async (req, res) => {
  try {
    const data = await get(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  res.status(200).json({ data: req.user });
});

router.post("/", async (req, res) => {
  try {
    const data = await save(req.body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ data });
  }
});

router.put("/:id", async (req, res) => {
  const data = await update(req.params.id, req.body);
  res.status(200).json({ data });
});

router.delete("/:id", async (req, res) => {
  const data = await remove(req.params.id);
  res.status(200).json({ data });
});

export default router;
