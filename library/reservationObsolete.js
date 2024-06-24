
const { Reservation , Livre } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')


// cette fonction permet de vérifier si une réservation est obsolète ou non. si oui => la reservation sera supprimer


const resaObsolete = async () => {

    let [limite , decalage , dataLivre] = [100 , 0 , undefined] 


    while(true){

        const dataReservation = await Reservation.findAll({where:{date_recuperation : {[Op.lt] : moment().startOf('days')}} , limit : limite , offset:  decalage}) 
        if(dataReservation.length === 0) break

        for (item of dataReservation) {

            await Reservation.destroy({ where: { id: item.id } })
            dataLivre = await Livre.findOne({ where: { id: item.LivreId } })
            dataLivre.exemplaire += 1
            await dataLivre.save()
        }

        decalage += limite

    }

}

module.exports = resaObsolete

