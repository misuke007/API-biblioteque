module.exports = (sequelize , datatype) => {

    return sequelize.define('Categorie' , {
        
        id:{

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },


        nom:{

            type : datatype.STRING,
            allowNull : false
        },


       

    })
}