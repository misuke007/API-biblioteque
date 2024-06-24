
const {Categorie} = require('../models')
const {ajout , miseJour , supprimer , voirTout, voirUn } = require('./ContrBase')



exports.ajoutCategorie = (req , res ) => {

    const {nom} = req.body
    ajout(req , res  , Categorie , {nom})

} 


exports.miseJourCategorie = (req , res) => {

    const {nom} = req.body
    let id = req.params.id
    miseJour(req , res , Categorie , {nom} , id)
    
}



exports.supprimerCategorie = (req, res) => {

    let id = req.params.id
    supprimer(req, res , Categorie , id)
}



exports.toutCategorie = (req, res) => voirTout(req, res , Categorie)



exports.unCategorie = (req, res) => {

    let id = req.params.id
    voirUn(req, res , Categorie , id)

}