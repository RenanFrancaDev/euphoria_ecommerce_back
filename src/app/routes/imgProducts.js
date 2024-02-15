import { Router } from "express";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";
import knex from "../services/knex.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const data = await knex("products_img").where({
      product_id: req.params.id,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      erro: true,
      mensagem: "Não foi encontrado!",
    });
  }
});

router.post("/:id", uploadMiddleware.single("image"), async (req, res) => {
  if (req.file) {
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
  } else {
    return res.status(400).json({
      erro: true,
      mensagem:
        "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!",
    });
  }
});

export default router;
