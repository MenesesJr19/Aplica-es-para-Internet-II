var Sequelize = require('sequelize');
var database = require('./database');

var Genero = database.define('Genero', {
        genero: Sequelize.STRING
    },

    {
        timestamps: false,
    }
);

module.exports = Genero