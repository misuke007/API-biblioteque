const moment = require('moment')
const { Emprunt, Notification, Utilisateur, Livre } = require('../models')
const { Op } = require('sequelize')
const { ajout } = require('../controllers/ContrBase')


const notificationUtilisateur = async (req, res) => {

    let [dateActuelle, dateRetour, resultat, limite, decalage, utilisateurConcerne] = [moment().startOf('days'), undefined, undefined, 2, 0]


    while (true) {

        const dataEmprunt = await Emprunt.findAll({ include: [Utilisateur, Livre], limit: limite, offset: decalage })
        if (dataEmprunt.length === 0) break

        for (item of dataEmprunt) {

            resultat = moment(item.date_retour_prevu).startOf('days').diff(dateActuelle, 'days')

            if (resultat == 1) {

                ajout(req, res, Notification, { NotificationType: 'Avertissement', UtilisateurId: item.Utilisateur.id, message: `Vous devez rendre le livre ${item.Livre.titre} Demain!` })

            } else if (resultat == 0) {

                ajout(req, res, Notification, { NotificationType: 'Avertissement', UtilisateurId: item.Utilisateur.id, message: `Vous devez rendre le livre ${item.Livre.titre} Aujourd'hui!` })

            }

        }

        decalage += limite

    }





}

module.exports = notificationUtilisateur