module.exports = (sequelize , datatype) => {

    return sequelize.define('Reponse' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },


        commentaire:{

            type : datatype.TEXT,
            allowNull : false
        },


       

    })
}