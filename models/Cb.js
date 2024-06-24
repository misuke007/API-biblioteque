module.exports = (sequelize , datatype) => {

    return sequelize.define('Cb' , {

        id : {

            type : datatype.INTEGER,
            primaryKey : true,
            autoIncrement : true,   
        },



        numero : {

            type :  datatype.STRING,
            allowNull : false
        },

        date_expiration : {

            type :  datatype.DATE,
            allowNull : false
        },

        cvv : {

            type :  datatype.INTEGER,
            allowNull : false
        },




        mot_de_passe : {

            type :  datatype.STRING,
            allowNull : false
        },

        
        somme : {

            type :  datatype.FLOAT,
            defaultVAlue : 0
        }
    })
}