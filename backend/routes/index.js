// routes.js
import express from "express";

import produitRoutes from "./produits_routes.js";
import usersRoutes from "./utilisateurs_routes.js";

const router = express.Router();

// Definition des routes
router.get("/", (req, res) => {
  res.end("Server marche");
});

router.use("/produits", produitRoutes);
router.use("/utilisateurs", usersRoutes);

export default router;
