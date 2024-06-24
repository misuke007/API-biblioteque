const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const AutorisationMembre = require('../config/AutorisationMembre')
const router = express.Router()

const {
    ajoutLivre,
    supprimerLivre,
    miseJourLivre, 
    toutLivre,
    unLivre ,
    rechercheLivre ,
    trierParCategorie,
    popularite,
    commentaire,
    reponse,
    nouveauteLivre} = require('../controllers/LivreContr')





router.post('/livre/ajout' ,ajoutLivre )
router.get('/livre/recherche' ,rechercheLivre )
router.put('/livre/modification/:id' ,AutorisationAdmin,miseJourLivre )
router.delete('/livre/suppression/:id' ,AutorisationAdmin, supprimerLivre)
router.get('/livre/tout' , toutLivre)
router.get('/livre/nouveaute' , nouveauteLivre)
router.get('/livre/un/:id' , unLivre)
router.get('/livre/tri-par-categorie/:categorieId' , trierParCategorie)
router.get('/livre/populaire' , popularite)
router.post('/livre/commentaire/:id' ,AutorisationMembre, commentaire)
router.post('/livre/commentaire/reponse/:id' ,AutorisationMembre, reponse)





module.exports = router

