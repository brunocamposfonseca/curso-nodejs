const db = require('./db');

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.sequelize.STRING
    },
    conteudo: {
        type: db.sequelize.TEXT
    }
});

module.exports = Post