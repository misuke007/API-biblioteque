module.exports = (sequelize , datatype) => {

    return sequelize.define('Emprunt' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },

        UtilisateurId:{

            type : datatype.INTEGER,
            
        },

        LivreId:{

            type : datatype.INTEGER,
        },


        date_retour_prevu:{

            type : datatype.DATE,
        },

        date_retour_actuelle:{

            type : datatype.DATE,
        },

        frais_de_retard : {

            type : datatype.INTEGER,
            defaultValue : 0
        },

    })
}