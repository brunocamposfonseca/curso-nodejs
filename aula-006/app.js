const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/myapp').then(() => {
    console.log("MongoDB Conectado com sucesso!")
}).catch((error) => {
    console.log("A conexão apresentou um erro: "+error)
});

// const Schema = mongoose.Schema

// const Usuario = new Schema ({
//     nome: String,
//     apelido: String,
//     idade: Number
// })

// mongoose.model('nomeDaCollection', Usuario)

// //Adicionar dados na collection
// const AdicionarDados = mongoose.model('nomeDaCollection')

// new AdicionarDados ({
//     nome: 'Nome qualquer',
//     apelido: 'Apelido qualquer',
//     idade: 30
// }).save().then(() => {
//     console.log('Feito!')
// }).catch((erro) => {
//     console.log('Erro ' + erro)
// })

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: false
    }
});

mongoose.model("users", UserSchema)

const newUser = mongoose.model("users")


new newUser({
    name: 'Bruno',
    lastname: 'Campos Fonseca',
    age: 15,
    email: 'emailteste@email.com',
    country: 'Brasil'
}).save().then(() => {
    console.log("Usuário cadastrado com sucesso!")
}).catch((err) => {
    console.log("O serial identificou um erro: "+err)
})
