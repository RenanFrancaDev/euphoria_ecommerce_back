import { Router } from "express";
import { getAll, get, save, update, remove } from "../controllers/product.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
//TODO Middleware
router.get("/", async (req, res) => {
  try {
    const data = await getAll();
    data.price_final = data.price - data.price * data.discount;
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: "não foi" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await get(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// TODO Middleware
router.post("/", async (req, res) => {
  // if (req.user.type !== "adm") {
  //   res.status(401).json({ error: "You are not adm" });
  // }

  try {
    const data = await save(req.body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  // if (req.user.type !== "adm") {
  //   res.status(401).json({ error: "You are not adm" });
  // }

  try {
    const data = await update(req.params.id, req.body, req.user.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  // if (req.user.type !== "adm") {
  //   res.status(401).json({ error: "You are not adm" });
  // }

  try {
    const data = await remove(req.params.id, req.user.id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
