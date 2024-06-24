module.exports = (sequelize , datatype) => {

    return sequelize.define('Reservation' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },

        UtilisateurId:{

            type : datatype.INTEGER
        },

        LivreId:{

            type : datatype.INTEGER,
        },


        date_recuperation:{

            type : datatype.DATE,
            allowNull : false, 
        },

    })
}