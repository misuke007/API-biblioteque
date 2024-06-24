const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const router = express.Router()





const { 

    ajoutAdmin , 
    modifAdmin,
    suppprimerUtilisateur,
    voirToutMembre,
    voirToutAdmin,
    voirUnMembre,
    voirUnAdmin, 
    paiementMembre,
    disponibilitéLivre} = require('../controllers/AdminContr')
  
   
router.use(AutorisationAdmin)

router.get('/liste-admin' , voirToutAdmin)
router.get('/liste-membre' ,   voirToutMembre)
router.get('/membre/:id' ,  voirUnMembre)
router.get('/:id' ,  voirUnAdmin)
router.post('/ajout-admin' , ajoutAdmin )
router.put('/modifier-admin/:id' , modifAdmin )
router.delete('/suppression-admin/:id' ,  suppprimerUtilisateur)
router.post('/paiement-membre/:id' ,  paiementMembre)
router.get('/disponibilite-livre' ,  disponibilitéLivre)


module.exports = router