const { Utilisateur, Cb } = require("../models");

const {
  ajout,
  miseJour,
  supprimer,
  voirTout,
  voirUn,
  recherche,
} = require("./ContrBase");

const { nouveauNom, enregistrement } = require("../library/optionFichier");
const bcrypt = require("bcryptjs");
const constante = require("../constantes/constantes");
const jwt = require("jsonwebtoken");

Utilisateur.hasOne(Cb);
Cb.belongsTo(Utilisateur);

exports.enregistrementMembre = async (req, res) => {
  const { nom, prenom, adresse, email, mot_de_passe } = req.body;
  const { photo } = req.files;

  const utilisateur = await Utilisateur.findOne({ where: { email } });

  if (utilisateur) {
    return res
      .status(200)
      .json({ serverMsgError: "Cet email est déjà utilisé!" });
  } else {
    const passCrypte = bcrypt.hashSync(mot_de_passe, 12);
    const couverture = nouveauNom(photo);
    enregistrement(photo, couverture);
    ajout(req, res, Utilisateur, {
      nom,
      prenom,
      adresse,
      email,
      badge: "membre",
      statut: "en attente",
      photo: couverture,
      mot_de_passe: passCrypte,
    });
  }
};

exports.verificationCarte = async (req, res) => {
  const { numero, cvv, date_expiration } = req.body;


  try {

    const dateExpi = new Date(date_expiration);
    const carte = await Cb.findOne({ where: { numero, cvv , date_expiration : dateExpi }});
    const dateActuel = new Date();

    if (carte) {

      if (dateExpi > dateActuel) {

        return res.status(200).json({ valide: true, carteId: carte.id });

      } else {

        return res
          .status(200)
          .json({ valide: false, serverMsgError: "Votre carte est expirée" });
      }

    } else {

      return res
        .status(200)
        .json({ valide: false, serverMsgError: "Carte invalide" });
    }
  } catch (error) {return res.status(500)}
};

exports.validationPaiement = async (req, res) => {
  const { mot_de_passe, carteId } = req.body;
  const droitMembre = 150;

  try {
    let cbData = await Cb.findOne({ where: { id: carteId } });
    let utilisateur = await Utilisateur.findOne({ where: { id: req.user.id } });

    if (mot_de_passe == cbData.mot_de_passe) {
      if (droitMembre > cbData.somme) {
        return res
          .status(200)
          .json({
            valide: false,
            serverMsgError: `Vous n'avez pas assez d'argent pour payer le droit! Veuillez consulter votre solde`,
          });
      } else {
        cbData.somme -= 150;
        await cbData.save();
        utilisateur.statut = "actif";
        await utilisateur.save();
        return res
          .status(200)
          .json({
            valide: true,
            server_msg_success: `Votre inscription est validé , connectez-vous maintenant  pour profiter de l'application `,
          });
      }
    } else {
      return res
        .status(200)
        .json({ valide: false, serverMsgError: "Mot de passe incorrecte!" });
    }
  } catch (error) {return res.status(500)}
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur)
      return res
        .status(200)
        .json({ serverMsgError: "Votre e-mail est invalide!" });
        
    const verificationMdp = bcrypt.compareSync(
      mot_de_passe,
      utilisateur.mot_de_passe
    );
    if (!verificationMdp)
      return res.status(200).json({ serverMsgError: "Mot de passe invalide!" });

    const token = jwt.sign(
      {
        id: utilisateur.id,
        email: utilisateur.email,
        badge: utilisateur.badge,
        status: utilisateur.statut,
      },
      "secret",
      { expiresIn: "3m" }
    );
    return res.status(200).json({ token, badge: utilisateur.badge });
  } catch (error) {return res.status(500)}
};
