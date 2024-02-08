import { Router } from "express";
import { getAll, get, save, update, remove } from "../controllers/address.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await getAll(req.user.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await get(req.params.id, req.user.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const data = await save(req.body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  req.body.user_id = req.user.id;
  const data = await update(req.params.id, req.body, req.user.id);
  res.status(200).json({ data });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const data = await remove(req.params.id, req.user.id);
  res.status(200).json({ data });
});

export default router;
