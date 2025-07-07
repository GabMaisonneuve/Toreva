import express from "express";
const router = express.Router();

import {
  creerProduit,
  obtenirUnProduit,
  modificationProduit,
  suppressionProduit,
  obtenirTousProduits,
} from "../controllers/produit.js";

router.get("/", obtenirTousProduits);

// POST / - Créer un produit
router.post("/", creerProduit);

// GET /produits/:id - Obtenir un produit
router.get("/:id", obtenirUnProduit);

// PUT /produits/:id - Mettre à jour un produit
router.put("/:id", modificationProduit);

// DELETE /products/:id - Supprimer un produit
router.delete("/:id", suppressionProduit);

export default router;
