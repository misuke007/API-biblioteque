const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const AutorisationMembre = require('../config/AutorisationMembre')
const router = express.Router()
const {ajoutReservation, validationEmprunt, rechercheReservation, historique} = require('../controllers/EmpruntContr')



router.post('/ajout-reservation'  ,AutorisationMembre ,   ajoutReservation)
router.post('/validation-emprunt' ,AutorisationAdmin,  validationEmprunt)
router.post('/recherche-resa' ,AutorisationAdmin, rechercheReservation)
router.get('/historique' ,AutorisationAdmin ,  historique)


module.exports = router
