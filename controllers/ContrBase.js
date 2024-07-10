const { Op } = require("sequelize");
const {
  Categorie,
  Livre,
  Reservation,
  Utilisateur,
  Notification,
} = require("../models");
const constante = require("../constantes/constantes");
const jwt = require("jsonwebtoken");
const { enregistrement } = require("../library/optionFichier");

exports.ajout = async (req, res, table, data, passAdmin) => {
  if (table.getTableName() == "Utilisateurs") {
    try {
      const newData = table.build(data);
      const prevData = await newData.save();
      const token = jwt.sign(
        { id: prevData.id, email: prevData.email },
        "secret",
      );
      return passAdmin
        ? res
            .status(200)
            .json({ serverMsgSuccess: `Nouveau admin ajouté `, passAdmin })
        : res
            .status(200)
            .json({ token, badge: prevData.badge, status: prevData.status });
    } catch (error) {
      return res.status(500);
    }
  } else if (table.getTableName() == "Reservations") {
    try {
      const dataLivre = await Livre.findOne({ where: { id: data.LivreId } });

      // vérification d'exemplaire

      if (dataLivre.exemplaire !== 0) {
        const newData = table.build(data);
        const dataLivre = await Livre.findOne({ where: { id: data.LivreId } });
        dataLivre.exemplaire -= 1;
        await dataLivre.save();
        const prevData = await newData.save();
        const utilisateurConcerne = await prevData.getUtilisateur();
        const newNotification = Notification.build({
          UtilisateurId: utilisateurConcerne.id,
          NotificationType: "Reservation",
          serverSuccessMsg: `${utilisateurConcerne.nom} ${utilisateurConcerne.prenom} a fait une réservation pour le livre ${dataLivre.titre}.`,
        });
        await newNotification.save();

        return res.status(200).json({
          serverSuccessMsg: `Réservation réussie pour le livre ${dataLivre.titre}`,
        });
      } else {
        return res.status(200).json({
          serverErrorMsg: `Ce livre n'est pas encore disponible pour le moment!`,
        });
      }
    } catch (error) {
      return res.status(500);
    }
  } else if (table.getTableName() == "Notifications") {
    // Ajout notifications pour les membres

    try {
      const newData = table.build(data);
      await newData.save();
    } catch (error) {
      return res.status(500);
    }
  } else {
    try {
      const newData = table.build(data);
      const prevdata = await newData.save();
      return res.status(200).json({ serverSuccessMsg: ` Ajouté avec succès!` , data : prevdata });
    } catch (error) {
      return res.status(500);
    }
  }
};

exports.miseJour = async (req, res, table, data, id) => {
  try {
    table.update(data, { where: { id } });
    return res.status(200).json({ serverSuccessMsg: "Mise à jour réussie!" });
  } catch (error) {
    return res.status(500);
  }
};

exports.supprimer = async (req, res, table, id) => {
  try {
    await table.destroy({ where: { id } });
    return res.status(200).json({ serverSuccessMsg: "Supprimé avec succès!" });
  } catch (error) {
    return res.status(500);
  }
};

exports.voirTout = async (req, res, table, badge) => {
  try {
    switch (badge) {
      case "membre": {
        data = await table.findAll({
          where: { badge: "membre", statut: "actif" },
        });
        break;
      }

      case "ADMIN": {
        data = await table.findAll({ where: { badge: "ADMIN" } });
        break;
      }

      default: {
        data = await table.findAll();
        break;
      }
    }

    return res.status(200).json({data});
  } catch (error) {
    return res.status(500);
  }
};

exports.voirUn = async (req, res, table, id, badge) => {
  let data;

  try {
    switch (badge) {
      case "membre": {
        data = await table.findOne({
          where: { id, badge: "membre", statut: "actif" },
        });
        break;
      }

      case "ADMIN": {
        data = await table.findOne({ where: { id, badge: "ADMIN" } });
        break;
      }

      default: {
        data = await table.findOne({ where: { id } });
        break;
      }
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500);
  }
};

exports.recherche = async (req, res, table) => {
  let whereClause = {};

  if (table.getTableName() == "Livres") {
    const { page, pageSize, rech, colonne } = req.query;

    const activePage = parseInt(page);
    const pageSiz = parseInt(pageSize);

    try {
      whereClause[colonne] = { [Op.like]: `%${rech}%` };
      const { count, rows } = await Livre.findAndCountAll({
        include: Categorie,
        where: whereClause,
        limit: pageSiz,
        offset: (activePage - 1) * pageSiz,
      });

      return res.status(200).json({
        currentPage: activePage,
        data: rows,
        totalPage: Math.ceil(count / pageSiz),
        count,
      });
    } catch (error) {
      return res.status(500);
    }
  } else if (table.getTableName() == "Reservations") {
    try {
      const dataReservation = await Reservation.findAll({
        include: [
          {
            model: Utilisateur,
            where: {
              [Op.or]: [
                { nom: { [Op.like]: `${rech}` } },
                { prenom: { [Op.like]: `${rech}` } },
              ],
            },
          },
        ],
      });

      return dataReservation.length !== 0
        ? res.status(200).json({ dataReservation })
        : res.status(200).json({ serverErrorMsg: `Aucun resultat!` });
    } catch (error) {
      return res.status(500);
    }
  }
};
