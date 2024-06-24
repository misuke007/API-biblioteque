
const {Livre , Categorie, Emprunt,Utilisateur, Commentaire, Reponse} = require('../models')
const {enregistrement} = require('../library/optionFichier')
const {ajout , miseJour , supprimer , voirTout, voirUn , recherche} = require('./ContrBase')
const {nouveauNom} = require('../library/optionFichier')
const fs = require('fs')
const constante = require('../constantes/constantes')



Categorie.hasOne(Livre)
Livre.belongsTo(Categorie)

Utilisateur.hasMany(Commentaire)
Commentaire.belongsTo(Utilisateur)

Livre.hasMany(Commentaire)
Commentaire.belongsTo(Livre)

Commentaire.hasMany(Reponse)
Reponse.belongsTo(Commentaire)

Utilisateur.hasMany(Reponse)
Reponse.belongsTo(Utilisateur)









exports.ajoutLivre = (req, res) => {

    const {titre  , auteur  ,  annee_publication, CategorieId , exemplaire , nouveaute} = req.body
    const {photo}  = req.files
    let couverture = nouveauNom(photo)
    enregistrement(photo , couverture)
    ajout(req , res , Livre , {titre  , auteur  ,  annee_publication ,couverture, CategorieId , exemplaire , nouveaute})

}


exports.nouveauteLivre = async(req, res) => {

    const nouveauteLivre = await Livre.findAll({where:{nouveaute : true} , limit : 10})
    return res.status(200).json({nouveauteLivre})
}



exports.supprimerLivre = async(req , res) => {

    const id = req.params.id
    
    const livre = await Livre.findOne({where:{id}})
    
    fs.unlink(`./public/couverture/${livre.couverture}` ,(error) => {
        if(error)console.log(error)})

    supprimer(req, res , Livre , id)

}



exports.miseJourLivre = async(req, res) => {

    const {titre  , auteur  ,  annee_publication, categorieId} = req.body
    const {photo}  = req.files
    const id = req.params.id

    const livre = await Livre.findOne({where:{id}})
    
    fs.unlink(`./public/couverture/${livre.couverture}` ,(error) => {
        if(error)console.log(error)})

    let couverture = nouveauNom(photo)
    enregistrement(photo , couverture)
    miseJour(req , res , Livre , {titre  , auteur  ,  annee_publication ,couverture, categorieId} , id)
}



exports.unLivre = (req , res) => {

    const id = req.params.id
    voirUn(req, res ,Livre ,  id)
}


exports.toutLivre = async(req , res) => {

    const page = parseInt( req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 2

    try{

        const {count , rows} = await Livre.findAndCountAll({include : Categorie , limit : pageSize  , offset : (page - 1) * pageSize})
        return res.status(200).json({data : rows , totalPage : Math.ceil(count / pageSize) , currentPage : page})

    }catch(error){ return res.status(500)}

}



exports.rechercheLivre = (req, res) => recherche(req , res , Livre )




exports.trierParCategorie = async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 2

    const CategorieId = req.params.categorieId

    try{
        
    const {count , rows} = await Livre.findAndCountAll({include : Categorie , where:{CategorieId} , limit : pageSize , offset:(page - 1) * pageSize})
    let dataCategorie = await Categorie.findOne({where:{id : CategorieId}})
    return res.status(200).json({totalPage : Math.ceil(count / pageSize) , data : rows, currentPage : page ,  categorieNom : dataCategorie.nom})

    }catch(error){console.log(error)}
}






exports.popularite = async (req, res)=> {
     try {
        let data =  await Livre.findAll({order : [['popularite' , 'DESC']]})
        return res.status(200).json(data)
     } catch (error) {
        console.log(error)
     }
}





exports.commentaire = async(req, res) => {
    try {
    
        const {commentaire , UtilisateurId} = req.body  
       
        const new_commentaire = Commentaire.build({
            commentaire,
            UtilisateurId,
            LivreId : req.params.id
        }) 
        await new_commentaire.save()
        return res.status(200).json(new_commentaire)
    } catch (error) {
        console.log(error)
    }
}





exports.reponse =async(req, res)=> {
    try {
    
        const {commentaire , UtilisateurId} = req.body  
       
        const new_reponse = Reponse.build({
            commentaire,
            UtilisateurId,
            CommentaireId : req.params.id
        }) 
        await new_reponse.save()
        return res.status(200).json(new_reponse)
    } catch (error) {
        console.log(error)
    }
}
 





