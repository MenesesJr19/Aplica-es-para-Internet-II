var Generos = require('../model/Genero');
var sequelize = require('../model/database');


const controllers = {}
sequelize.sync()

controllers.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await Generos.destroy({ where: { id: id } })
        res.json({ success: true, deleted: del, message: "Deleted successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

controllers.update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await Generos.update(
            { ...body },
            {
                where: { id: id }
            }
        );
        res.json({ success: true, data: data, message: "Updated successful" });
    } catch (error) {
        res.status(500).json({ 
            success: false, error: error.message 
        });
    }
}

controllers.get = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Generos.findOne(
            { where: { id: id } }
        );
        res.json({
             success: true, data: data 
            });
    } catch (error) {
        res.status(500).json({ 
            success: false, error: error.message 
        });
    }
}

controllers.create = async (req, res) => {
    try {
        const body = req.body;
        const data = await Generos.create(
            { ...body }
        );
        res.status(200).json({ 
            success: true, message: "Registado", data: data 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, error: error.message
         });
    }
}

controllers.list = async (req, res) => {
    try {
        const data = await Generos.findAll({});
        res.json({ 
            sucess: true, data: data 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, error: error.message 
        });
    }
}

module.exports = controllers;