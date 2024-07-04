const express = require('express')
const bodyParser = require('body-parser')
const swagger = require('./config/swagger');
const cors = require('cors')
const db = require('./models')
const  fileUpload = require('express-fileupload')
const path =  require('path')





const resaObsolete = require('./library/reservationObsolete')
const calculAmende = require('./library/calculAmende')
const notificationUtilisateur = require('./library/notificationUtilisateur')

const CategorieResource = require('./resources/CategorieResource')
const LivreResource = require('./resources/LivreResource')
const AuthResource = require('./resources/AuthResource')
const AdminResource = require('./resources/AdminResource')
const EmpruntResource = require('./resources/EmpruntResource')





const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json({extended : false}))
app.use(fileUpload())


app.use('/images' , express.static(path.join(__dirname, 'public' , 'couverture')));
app.use('/api' , CategorieResource)
app.use('/api' , LivreResource)
app.use('/admin' , AdminResource)
app.use('/auth' , AuthResource)
app.use('/emprunt' , EmpruntResource)


// resaObsolete()
// calculAmende()
// notificationUtilisateur()
// setInterval(notificationUtilisateur , 24*60*60*1000)
// setInterval(calculAmende ,  24*60*60*1000)
// setInterval(resaObsolete ,  24*60*60*1000)


swagger(app)

db.sequelize.sync()

.then(() => {

    app.listen(9000 , () => {

        console.log(`server started on : http//:localhost:9000 `)
    })
})
