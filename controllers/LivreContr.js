

const {
  Livre,
  Categorie,
  Emprunt,
  Utilisateur,
  Commentaire,
  Reponse,
} = require("../models");

const { enregistrement } = require("../library/optionFichier");

const {
  ajout,
  miseJour,
  supprimer,
  voirTout,
  voirUn,
  recherche,
} = require("./ContrBase");

const { nouveauNom } = require("../library/optionFichier");
const fs = require("fs");
const constante = require("../constantes/constantes");
const { Op } = require("sequelize");

Categorie.hasOne(Livre);
Livre.belongsTo(Categorie);

Utilisateur.hasMany(Commentaire);
Commentaire.belongsTo(Utilisateur);

Livre.hasMany(Commentaire);
Commentaire.belongsTo(Livre);

Commentaire.hasMany(Reponse);
Reponse.belongsTo(Commentaire);

Utilisateur.hasMany(Reponse);
Reponse.belongsTo(Utilisateur);

exports.ajoutLivre = (req, res) => {
  const {
    titre,
    auteur,
    annee_publication,
    CategorieId,
    exemplaire,
    nouveaute,
  } = req.body;

  const { photo } = req.files;
  let couverture = nouveauNom(photo);

  enregistrement(photo, couverture);
  ajout(req, res, Livre, {
    titre,
    auteur,
    annee_publication,
    couverture,
    CategorieId,
    exemplaire,
    nouveaute,
  });
};

exports.nouveauteLivre = async (req, res) => {
  
  try{

    const nouveauteLivre = await Livre.findAll({
      where: { nouveaute: true },
      limit: 10,
    });
    return res.status(200).json({ nouveauteLivre });

  }catch(error){return res.status(500)}
};

exports.supprimerLivre = async (req, res) => {
  const id = req.params.id;

  try{

    const livre = await Livre.findOne({ where: { id } });

  fs.unlink(`./public/couverture/${livre.couverture}`, (error) => {
    if (error) console.log(error);
  });

  supprimer(req, res, Livre, id);

  }catch(error){return res.status(500)}

  
};

exports.miseJourLivre = async (req, res) => {
  const {
    titre,
    auteur,
    annee_publication,
    categorieId,
    exemplaire,
    nouveaute,
  } = req.body;
  const { photo } = req.files;
  const id = req.params.id;

  const livre = await Livre.findOne({ where: { id } });

  fs.unlink(`./public/couverture/${livre.couverture}`, (error) => {
    if (error) console.log(error);
  });

  let couverture = nouveauNom(photo);
  enregistrement(photo, couverture);
  miseJour(
    req,
    res,
    Livre,
    {
      titre,
      auteur,
      annee_publication,
      couverture,
      CategorieId: categorieId,
      exemplaire,
      nouveaute,
    },
    id
  );
};

exports.unLivre = (req, res) => {
  const id = req.params.id;
  voirUn(req, res, Livre, id);
};

exports.toutLivre = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;

  try {
    const { count, rows } = await Livre.findAndCountAll({
      include: Categorie,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return res.status(200).json({
      data: rows,
      totalPage: Math.ceil(count / pageSize),
      currentPage: page,
    });

  } catch (error) {return res.status(500);}
};

exports.rechercheLivre = (req, res) => recherche(req, res, Livre);

exports.trierParCategorie = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;

  const CategorieId = req.params.categorieId;

  try {
    const { count, rows } = await Livre.findAndCountAll({
      include: Categorie,
      where: { CategorieId },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    let dataCategorie = await Categorie.findOne({ where: { id: CategorieId } });
    return res.status(200).json({
      totalPage: Math.ceil(count / pageSize),
      data: rows,
      currentPage: page,
      categorieNom: dataCategorie.nom,
    });

  }catch (error){return res.status(500)}
};

exports.popularite = async (req, res) => {
  try {

    let data = await Livre.findAll({ order: [["popularite", "DESC"]] });
    const { count, rows } = await Livre.findAndCountAll({
      where: { popularite:{[Op.gt]:20}},
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    return res.status(200).json(data);

  } catch (error) {return res.status(500)}
};

exports.ajoutCommentaire = async (req, res) => {
  try {
    const { commentaire } = req.body;
    const UtilisateurId = req.user.id;
    const LivreId = req.params.livreId;

    const new_commentaire = Commentaire.build({
      commentaire,
      UtilisateurId,
      LivreId,
    });

    const nouveauCommentaire = await new_commentaire.save();
    return res.status(200).json({nouveauCommentaire});

  } catch (error) {return res.status(500)}
};

exports.toutCommentaire = async (req, res) => {

  const LivreId = req.params.livreId;

  try {

    const data = await Commentaire.findAll({ where: { LivreId } });
    return res.status(200).json({ data });

  } catch (error) {return res.status(500)}
};

exports.toutReponseComs = async(req, res) => {

  const CommentaireId = req.params.commentaireId

  try{

    const data = await Reponse.findAll({where:{CommentaireId}})
    return res.status(200).json({data})

  }catch(error){return res.status(500)}

}


exports.ajoutReponseComs = async (req, res) => {
  try {
    const { commentaire } = req.body;
    const CommentaireId = req.params.commentaireId;
    const UtilisateurId = req.user.id;

    const new_reponse = Reponse.build({
      commentaire,
      UtilisateurId,
      CommentaireId,
    });
    await new_reponse.save();
    return res.status(200).json(new_reponse);
  } catch (error) {return res.status(500)}
};

exports.ajoutNote = (req, res) => {
  
  const { note } = req.body;
  const id = req.params.livreId;
 

  try {

    miseJour(req, res, Livre, {popularite:note }, id);
  } catch (error) {return res.status(500)}
};
