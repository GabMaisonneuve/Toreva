import JSONArrayDatabase from "../JSONArrayDatabase.js";

const utilisateursDB = new JSONArrayDatabase("utilisateurs.json");

export default class Utilisateur {
  static async creerUtilisateur(utilisateurData) {
    const utilisateurExiste = await utilisateursDB.findByEmail(
      utilisateurData.email
    );
    if (utilisateurExiste) {
      throw new Error("Cet utilisateur existe déjà");
    }
    return utilisateursDB.insert(utilisateurData);
  }

  static async modificationUtilisateur(id, changement) {
    if (changement.email) {
      const utilisateurExiste = await utilisateursDB.findByEmail(
        changement.email
      );
      if (utilisateurExiste && utilisateurExiste.id !== id) {
        throw new Error("Adresse email déjà utilisée");
      }
    }

    return utilisateursDB.update(id, changement);
  }

  static async suppressionUtilisateur(id) {
    return utilisateursDB.delete(id);
  }

  static async rechercheUtilisateurParId(id) {
    return utilisateursDB.findById(id);
  }
}
