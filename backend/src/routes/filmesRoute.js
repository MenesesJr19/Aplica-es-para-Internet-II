const express = require('express');
const router = express.Router();

//importar os controladores [2]
const filmesController = require('../controllers/filmesController')

router.get('/delete/:id', filmesController.delete);

router.post('/create', filmesController.create);

router.put('/update/:id', filmesController.update);

router.get('/get/:id', filmesController.get);

router.get('/save', (req, res) => {
	res.json({status: 'Filmes Saved'});
});

router.get('/list', filmesController.list);

module.exports = router;