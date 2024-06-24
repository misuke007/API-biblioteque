const { customAlphabet } = require('nanoid');


const genereMpd = () => {

const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);
const mdp = generateCode()
return mdp

}



module.exports = genereMpd

