
const { mongoose } = require('mongoose');
const uri = "mongodb+srv://adminPaquetes:TWU1lHYuzmBzGFM2@paquetes-comfama.4muai.mongodb.net/paquetesComfama?retryWrites=true&w=majority";

module.exports = ()=> mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
