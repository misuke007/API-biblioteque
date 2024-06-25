const { Utilisateur, Livre } = require("../models");
const { ajout, miseJour, supprimer, voirTout, voirUn } = require("./ContrBase");
const { nouveauNom, enregistrement } = require("../library/optionFichier");
const genereMdp = require("../library/creationMdp");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { Op } = require("sequelize");

exports.ajoutAdmin = (req, res) => {
  const { nom, prenom, email } = req.body;
  const { photo } = req.files;
  const mot_de_passe = "ADMIN-" + genereMdp();
  const passCrypte = bcrypt.hashSync(mot_de_passe, 12);
  const couverture = nouveauNom(photo);
  enregistrement(photo, couverture);
  ajout(
    req,
    res,
    Utilisateur,
    {
      nom,
      prenom,
      email,
      mot_de_passe: passCrypte,
      badge: "ADMIN",
      photo: couverture,
    },
    mot_de_passe
  );
};

exports.modifAdmin = async (req, res) => {
  const { nom, prenom, email } = req.body;
  const { photo } = req.files;
  const id = req.params.id;

  try {
    const utilisateur = await Utilisateur.findOne({ where: { id } });

    fs.unlink(`./public/couverture/${utilisateur.photo}`, (error) => {
      if (error) console.log(error);
    });

    const couverture = nouveauNom(photo);
    enregistrement(photo, couverture);
    miseJour(
      req,
      res,
      Utilisateur,
      { nom, prenom, email, photo: couverture },
      id
    );
  } catch (error) {return res.status(500)}
};

exports.suppprimerUtilisateur = async (req, res) => {
  const id = req.params.id;

  try {
    const utilisateur = await Utilisateur.findOne({ where: { id } });

    fs.unlink(`./public/couverture/${utilisateur.photo}`, (error) => {
      if (error) console.log(error);
    });

    supprimer(req, res, Utilisateur, id);
  } catch (error) {return res.status(500)}
};

exports.paiementMembre = async (req, res) => {
  try {
    let utilisateur = await Utilisateur.findOne({
      where: { id: req.params.id },
    });

    utilisateur = {
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      adresse: utilisateur.adresse,
      badge: utilisateur.badge,
      statut: "actif",
      photo: utilisateur.photo,
      mot_de_passe: utilisateur.mot_de_passe,
    };
    await Utilisateur.update(utilisateur, { where: { id: req.params.id } });

    return res.status(200).json({ message: "Paiement Effectuée", utilisateur });
  } catch (error) {return res.status(500)}
};

exports.voirToutMembre = (req, res) =>
  voirTout(req, res, Utilisateur, (badge = "membre"));

exports.voirToutAdmin = (req, res) =>
  voirTout(req, res, Utilisateur, (badge = "ADMIN"));

exports.voirUnMembre = (req, res) => {
  voirUn(req, res, Utilisateur, (id = req.params.id), (badge = "membre"));
};

exports.voirUnAdmin = (req, res) => {
  voirUn(req, res, Utilisateur, (id = req.params.id), (badge = "ADMIN"));
};

exports.disponibilitéLivre = async (req, res) => {
  try {
    const livre = await Livre.findAll({
      where: {
        exemplaire: {
          [Op.ne]: 0,
        },
      },
    });
    return res.status(200).json({ message: "Les livres disponibles", livre });
    
  } catch (error) {return res.status(500)}
};
