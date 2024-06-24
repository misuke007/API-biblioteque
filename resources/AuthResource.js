const express = require('express')
const securiteCb = require('../config/securiteCb')
const router = express.Router()

const { 
    
    enregistrementMembre, 
    verificationCarte, 
    validationPaiement, 
    login, 
    } = require('../controllers/AuthContr')

router.post('/inscription-utilisateur' , enregistrementMembre)
router.post('/verification-validite-carte' ,  securiteCb , verificationCarte)
router.post('/paiement' , securiteCb , validationPaiement)
router.post('/connexion' , login)


module.exports = router