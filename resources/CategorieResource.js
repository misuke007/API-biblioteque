const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const router = express.Router()
const { ajoutCategorie, miseJourCategorie, supprimerCategorie, toutCategorie, unCategorie } = require('../controllers/CategorieContr')




router.post('/categorie/ajout' , AutorisationAdmin, ajoutCategorie)
router.put('/categorie/modifier/:id', AutorisationAdmin, miseJourCategorie)
router.delete('/categorie/suppression/:id',AutorisationAdmin, supprimerCategorie)
router.get('/categorie/tout' , toutCategorie)
router.get('/categorie/un/:id',AutorisationAdmin, unCategorie)










module.exports = router