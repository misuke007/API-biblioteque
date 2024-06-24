const {Emprunt} = require('../models')
const {Op} = require('sequelize')
const moment = require('moment')



const calculAmende = async () => {

    let [limite , decalage] = [100 , 0]

    

    while(true){

        const dataEmprunt = await Emprunt.findAll({where:{date_retour_prevu:{[Op.lt] : moment().startOf('days')}} , limit : limite, offset : decalage})
        if(dataEmprunt.length === 0) break

        for(item of dataEmprunt){

            item.frais_de_retard += 3000
            await item.save()
        }

        decalage += limite

    }
}


module.exports = calculAmende