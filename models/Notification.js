module.exports = (sequelize , datatype) => {

    return sequelize.define('Notification' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },

        NotificationType:{

            type : datatype.STRING,
            allowNull : false, 
        },


        UtilisateurId:{

            type : datatype.INTEGER,

        },

        
        message:{

            type : datatype.TEXT,
            allowNull : false

        },

        lu:{

            type : datatype.BOOLEAN,
            defaultValue : false

        },


    })
}