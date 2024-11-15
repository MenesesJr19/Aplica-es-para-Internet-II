const express = require('express');
const router = express.Router();

//importar os controladores [2]
const generosController = require('../controllers/generosController')

router.get('/delete/:id', generosController.delete);

router.post('/create', generosController.create);

router.put('/update/:id', generosController.update);

router.get('/get/:id', generosController.get);

router.get('/save', (req, res) => {
	res.json({status: 'Generos Saved'});
});

router.get('/list',generosController.list);

module.exports = router;