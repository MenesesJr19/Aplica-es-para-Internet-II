import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from './view/filmesform';
import List from './view/filmeslist';
import Edit from './view/filmesedit';
import FormGenero from './view/generosform';
import ListGenero from './view/generoslist';
import EditGenero from './view/generosedit';

/*
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("upload: " + req.file);
    res.send({ message: 'File uploaded successfully!', data: req.file });
});*/


function App() {
	return (
		<Router>
			<div className="App">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse"
						id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Lista de Filme </Link>
							</li>
							<li className="nav-item active">
								<Link className="nav-link" to="/genero/list">Lista de Genero </Link>
							</li>
						</ul>
						<Link className="btn btn-success " to="/form">Adicionar
							Filme</Link>
						
							<Link className="btn btn-success " to="/genero/form">Adicionar
							Genero</Link>
					</div>
				</nav>
				<div className="container py-4">
					<div className="row">
						<Routes>
							<Route path="/" element={<List />} />
							<Route path="/list" element={<List />} />
							<Route path="/form" element={<Form />} />
							<Route path="/edit/:filmeId" element={<Edit />} />

							<Route path="/genero/list" element={<ListGenero />} />
							<Route path="/genero/form" element={<FormGenero />} />
							<Route path="/generos/edit/:generoId" element={<EditGenero />} />


						</Routes>
					</div>
				</div>
			</div>
		</Router >
	);
}

export default App;