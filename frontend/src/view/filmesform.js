import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function EditComponent() {
	const [data, setdata] = useState("");
	const [campId, setcampId] = useState("");
	const [campFoto, setcampFoto] = useState("");
	const [campTitulo, setcampTitulo] = useState("");
	const [campgenero, setcampgeneros] = useState("");
	const [campDescricao, setcampDescricao] = useState("");
	const [stringGeneros, setstringGeneros] = useState("");
	const [selectGenero, setselectGeneros] = useState("");
	const [Generoidelist, setGeneroide] = useState([]);
	const baseUrlf = "http://localhost:3000";

	useEffect(() => {
		LoadGeneroo();
	}, []);
	function LoadGeneroo() {
		const url = "http://localhost:3000/generos/list";
		axios
			.get(url)
			.then(res => {
					const generos = res.data.data;
					setGeneroide(generos);

			})
			.catch(error => {
				console.log("Error loading genero:", error);
			});
	}

	console.log(Generoidelist);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
		axios.post(baseUrlf + '/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => {
				console.log(response.data.data.filename);
				setcampFoto(response.data.data.filename);
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<div>
			<div className="form-row justify-content-center">
				<div className="form-group col-md-6">
					<label htmlFor="inputID">Id </label>
					{/*<input type="text" className="form-control"
						placeholder="Id"
						value={campId} onChange={value =>
							setcampId(value.target.value)} />*/}
				</div>
				<div className="FileBox form-row">
					<div className="card file-box form-group col-md-6">
						<div className="card-header">Foto</div>
						<div className="card-body form-group">
							<label htmlFor="file-input">Escolha um ficheiro:</label>
							<br />
							<input
								type="file"
								className="form-control-file"
								accept="image/*"
								onChange={handleFileChange}
							/>
						</div>
					</div>
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="inputTitulo">Título</label>
					<input type="text" className="form-control"
						placeholder="Título"
						value={campTitulo} onChange={(value) =>
							setcampTitulo(value.target.value)} />
				</div>
			</div>
			<div className="form-row">
				<div className="form-group col-md-6">
					<label htmlFor="inputState">Genero</label>
					<select id="inputState" className="form-control" onChange={value => setselectGeneros(value.target.value)}>
						<option defaultValue>Escolha uma opção...</option>
						{Generoidelist.map(generos => (
							<option key={generos.id} value={generos.id}>{generos.genero}</option>
						))}
					</select>
				</div>

			</div>
			<div className="form-group">
				<label htmlFor="inputDescricao">Descrição</label>
				<input type="text" className="form-control"
					id="inputDescricao" placeholder="Descreve aqui o filme"
					value={campDescricao} onChange={(value) =>
						setcampDescricao(value.target.value)} />
			</div>
			<button type="submit" className="btn btn-primary"
				onClick={() => SendSave()}>Guardar</button>
		</div>
	);

	function SendSave() {
		if (setcampId === 0) {
			alert("Choose Id!")
		}
		else if (campFoto === "") {
			alert("Insert the Foto!")
		}
		else if (campTitulo === "") {
			alert("Insert Título!")
		}

		else if (campDescricao === "") {
			alert("Insert Descrição!")
		}
		else {

			const createUrl = "http://localhost:3000/filmes/create"
			const datapost = {

				/*id: campId,*/
				foto: campFoto,
				titulo: campTitulo,
				GeneroId: selectGenero,
				descricao: campDescricao

			}
			axios.post(createUrl, datapost)
				.then(response => {
					if (response.data.success === true) {
						alert("1" + response.data.message)
					}
					else {
						alert("2" + response.data.message)
					}
				}).catch(error => {
					alert("Error 34 " + error)
				})
		}
	}
}