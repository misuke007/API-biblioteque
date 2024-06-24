const path = require('path')
const sharp = require('sharp')



const nouveauNom = (fichier) => {

    const ext = path.extname(fichier.name)
    const nom = `FILE-${Date.now()}${ext}`
    return nom
}



const extractionFormat = (photo) => {

    const extension = path.extname(photo.name).substring(1)
    return extension
}



const enregistrement = (photo , nom) => {

    const chemin = path.join(__dirname , `../public/couverture/${nom}`)
    const format = extractionFormat(photo)

    sharp(photo.data)
        .toFormat(format , {quality : 60})
        .toFile(chemin , (error) => console.log(error))
}


module.exports = {nouveauNom , enregistrement}