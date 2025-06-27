import express from "express";
const router = express.Router();

import {
  creerUnUtilisateur,
  obtenirUnUtilisateur,
  modificationUtilisateur,
  suppressionUtilisateur,
} from "../controllers/utilisateur.js";

// POST / - Créer un utilisateur
router.post("/", creerUnUtilisateur);

// GET //:id - Obtenir un utilisateur
router.get("/:id", obtenirUnUtilisateur);

// PUT //:id - Mettre à jour un utilisateur
router.put("/:id", modificationUtilisateur);

// DELETE //:id - Supprimer un utilisateur
router.delete("/:id", suppressionUtilisateur);

export default router;
