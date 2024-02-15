import { Router } from "express";
import { getAll, get, save, update, remove } from "../controllers/product.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import fs from "fs";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: "errrrrroo" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await get(req.params.id);
    // data.images = [];
    // const productimages = fs.readdirSync(data.imageUrls);
    // for (let i in productimages) {
    //   data.images.push(data.imageUrls + "/" + productimages[i]);
    // }
    // console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/", async (req, res) => {
  // if (req.user.type !== "adm") {
  //   res.status(401).json({ error: "You are not adm" });
  // }

  try {
    const data = await save(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console(error);
    res.status(400).json({ error });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const data = await update(req.params.id, req.body, req.user.id);
  res.status(200).json({ data });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const data = await remove(req.params.id, req.user.id);
  res.status(200).json({ data });
});

export default router;
