var Sequelize = require('sequelize');
const sequelize = new Sequelize(
	'ai2',
	'postgres',
	'postgres',
	{
		host: 'localhost',
		port: '5432',
		dialect: 'postgres',
		logging: false,
		define:{
			timestamps: false,
			
		}
	}
);

module.exports = sequelize;