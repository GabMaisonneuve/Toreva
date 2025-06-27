import Utilisateur from "../database/models/Utilisateur.js";

export const creerUnUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.creerUtilisateur(req.body);
    res.status(201).json({
      utilisateur: utilisateur,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenirUnUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.rechercheUtilisateurParId(
      req.params.id
    );
    if (!utilisateur)
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modificationUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.modificationUtilisateur(
      req.params.id,
      req.body
    );
    if (!utilisateur)
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const suppressionUtilisateur = async (req, res) => {
  try {
    const supprime = await Utilisateur.suppressionUtilisateur(req.params.id);
    if (!supprime)
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
