import Produit from "../database/models/Produit.js";

export const creerProduit = async (req, res) => {
  try {
    const produit = await Produit.creerProduit(req.body);
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenirUnProduit = async (req, res) => {
  try {
    const produit = await Produit.rechercheParIdProduit(req.params.id);
    if (!produit) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modificationProduit = async (req, res) => {
  try {
    const produit = await Produit.modificationProduit(req.params.id, req.body);
    if (!produit) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(produit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const suppressionProduit = async (req, res) => {
  try {
    await Produit.suppressionProduit(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
