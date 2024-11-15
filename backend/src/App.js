const express = require('express');
const app = express();
const filmesRoutes = require('./routes/filmesRoute.js')
const generosRoutes = require('./routes/generosRoute.js')
const multer = require('multer');
const upload = require('./uploads');
const path = require('path');

const port = 3000;
// Configurar CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Configurações
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Rotas


app.use('/filmes', filmesRoutes)

app.use('/generos', generosRoutes)


app.use('/uploads', express.static(path.join(__dirname, 'uploads/fotos')));

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("upload: " + req.file);
    res.send({ message: 'File uploaded successfully!', data: req.file });
});


app.listen(app.get('port'), () => {
	console.log("Start server on port " + app.get('port'))
})

