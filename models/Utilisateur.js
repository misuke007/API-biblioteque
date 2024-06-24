module.exports = (sequelize , datatype) => {

    return sequelize.define('Utilisateur' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },

        nom:{

            type : datatype.STRING,
            allowNull : false, 
        },

        prenom:{

            type : datatype.STRING,
            allowNull : false, 
        },


        adresse:{

            type : datatype.STRING, 
        },


        email : {

            type : datatype.STRING,
            allowNull : false
        },

        badge : {

            type : datatype.STRING,
            allowNull : false
        },

        statut : {

            type : datatype.STRING,
        },

       

        photo:{

            type : datatype.STRING,
            allowNull : false, 
        },


        mot_de_passe:{

            type : datatype.STRING,
            allowNull : false
        },


    })
}