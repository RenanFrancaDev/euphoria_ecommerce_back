import { Router } from "express";
import { uploadMiddleware } from "../middleware/uploadCategoryMiddleware.js";
import knex from "../services/knex.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await knex("category").select();

    for (let i = 0; i < data.length; i++) {
      data[i].image = `http://localhost:3000/fotos/category/${data[i].image}`;
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      erro: true,
      mensagem: "Não foi encontrado!",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await knex("category").where({
      id: req.params.id,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      erro: true,
      mensagem: "Não foi encontrado!",
    });
  }
});

router.post("/", uploadMiddleware.single("image"), async (req, res) => {
  if (req.file) {
    try {
      const data = await knex("category").insert({
        image: req.file.filename,
        name: req.body.name,
      });
      res.status(200).json({
        erro: false,
        mensagem: "Upload realizado com sucesso!",
        data,
      });
    } catch (error) {
      res.status(400).json({
        erro: true,
        mensagem: "Erro: Upload não realizado com sucesso!",
      });
    }
  } else {
    return res.status(400).json({
      erro: true,
      mensagem:
        "Erro: Upload da foto não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!",
    });
  }
});

router.put("/:id", uploadMiddleware.single("image"), async (req, res) => {
  try {
    req.body_product_id = req.params.id;
    const data = await knex("products_img").insert({
      image: req.file.filename,
      product_id: req.params.id,
    });
    res.status(200).json({
      erro: false,
      mensagem: "Upload realizado com sucesso!",
      data,
    });
  } catch (error) {
    res.status(400).json({
      erro: true,
      mensagem: "Erro: Upload não realizado com sucesso!",
    });
  }
});

export default router;
