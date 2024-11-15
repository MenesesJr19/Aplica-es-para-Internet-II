var Filmes = require('../model/Filme');
var Genero = require('../model/Genero');
var sequelize = require('../model/database');


const controllers = {}
sequelize.sync()

controllers.delete = async (req, res) => {
	// parâmetros por post
	const id = req.params.id;
	// delete por sequelize
	const del = await Filmes.destroy({
		where: { id: id }
	})
	res.json({ success: true, deleted: del, message: "Deleted successful" });
}

controllers.update = async (req, res) => {
	// parameter get id
	const { id } = req.params;
	// parameter POST
	const body = req.body;
	// Update data
	const data = await Filmes.update({
	...body
	},
		{
			where: { id: id }
		})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		})
	res.json({ success: true, data: data, message: "Updated successful" });
}

controllers.get = async (req, res) => {
	const { id } = req.params;
	const data = await Filmes.findAll({
		where: { id: id },
		include : [Genero]
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		})
	res.json({ success: true, data: data });
}

controllers.create = async (req, res) => {
	// data
	const body = req.body;
	// create
	const data = await Filmes.create({...body
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			console.log("Erro: " + error)
			return error;
		})
	// return res
	res.status(200).json({
		success: true,
		message: "Registado",
		data: data
	});
}

controllers.list = async (req, res) => {
	const data = await Filmes.findAll({
		include : [Genero]
	})
		.then(function (data) {
			return data;
		})
		.catch(error => {
			return error;
		});
	res.json({ sucess: true, data: data });
}

module.exports = controllers;