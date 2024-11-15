var Sequelize = require('sequelize');
var sequelize = require('./database');

var Genero = require('./Genero');

var Filme = sequelize.define('Filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    foto: Sequelize.STRING,
    titulo: Sequelize.STRING,
    
    GeneroId: {
        type: Sequelize.INTEGER,
        references: {
            model: Genero,
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    descricao: Sequelize.TEXT
},
{
    timestamps: false,
});
Filme.belongsTo(Genero)

module.exports = Filme