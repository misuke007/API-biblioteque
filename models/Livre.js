module.exports = (sequelize , datatype) => {

    return sequelize.define('Livre' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },

        titre:{

            type : datatype.STRING,
            allowNull : false, 
        },

        auteur:{

            type : datatype.STRING,
            allowNull : false, 
        },


        annee_publication:{

            type : datatype.DATE,
            allowNull : false, 
        },

        popularite :{

            type : datatype.INTEGER,
            defaultValue : 0 
        },

        exemplaire : {

            type : datatype.INTEGER,
            allowNull : false
        },
        

        CategorieId:{

            type : datatype.INTEGER,
            allowNull : false, 
        },


        couverture:{

            type : datatype.STRING,
            allowNull : false, 
        },


        nouveaute : {

            type : datatype.BOOLEAN,
            defaultValue : false , 
      }

    })
}