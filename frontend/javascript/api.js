import { env } from "../config/env.js";

export const fetchProduct = async () => {
  try {
    const reponse = await fetch(`${env.BACKEND_PRODUCTS_URL}`);
    return reponse.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = async (id) => {
  const res = await fetch(`${env.BACKEND_PRODUCTS_URL}/${id}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération du produit");
  return await res.json();
};

export const addItem = async (item) => {
  let messageErreur;
  const reponse = await fetch(`${env.BACKEND_PRODUCTS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!reponse.ok) {
    messageErreur = "Erreur lors de l'ajout de l'item";
  } else {
    messageErreur = "Item ajouté avec succès";
  }
  return messageErreur;
};

export const deleteItem = async (id) => {
  try {
    const reponse = await fetch(`${env.BACKEND_PRODUCTS_URL}/${id}`, {
      method: "DELETE",
    });
    if (!reponse.ok) {
      throw new Error("Erreur lors de la suppression de l'item");
    }
    return "Item supprimé avec succès";
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const modifyItem = async (id, item) => {
  try {
    const reponse = await fetch(`${env.BACKEND_PRODUCTS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!reponse.ok) {
      throw new Error("Erreur lors de la modification de l'item");
    }
    return "Item modifié avec succès";
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
