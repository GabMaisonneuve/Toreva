import JSONArrayDatabase from "../JSONArrayDatabase.js";
const dbProduit = new JSONArrayDatabase("produits.json");

export default class Produit {
  static async creerProduit(produitData) {
    if (!produitData.name) {
      throw new Error("Le nom est requis");
    }
    if (!produitData.price) {
      throw new Error("Le prix est requis");
    }
    if (!produitData.description) {
      throw new Error("La description est requise");
    }
    if (!produitData.category) {
      throw new Error("La catégorie est requise");
    }
    return dbProduit.insert(produitData);
  }

  static async rechercheParIdProduit(id) {
    return dbProduit.findById(id);
  }

  static async modificationProduit(id, modifications) {
    const produitExiste = await dbProduit.findById(id);
    if (!produitExiste) {
      throw new Error("Produit non trouvé");
    }
    const misesAJour = {
      ...produitExiste,
      ...modifications,
      dateMiseAJour: new Date().toISOString(),
    };

    return dbProduit.update(id, misesAJour);
  }

  static async suppressionProduit(id) {
    return dbProduit.delete(id);
  }
}
