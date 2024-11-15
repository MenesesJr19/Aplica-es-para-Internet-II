import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function EditComponent() {
	const [dataFilme, setdataFilme] = useState("");
	const [campId, setcampId] = useState("");
	const [campFoto, setcampFoto] = useState("");
	const [campTitulo, setcampTitulo] = useState("");
	const [campgenero, setcampgeneros] = useState("");
	const [campDescricao, setcampDescricao] = useState("");
	const [stringGenero, setstringGenero] = useState("");
	const [selectGenero, setselectGeneros] = useState("");
	const [Generoidelist, setGeneroide ] = useState([]);
	const { filmeId } = useParams();

	useEffect(() => {
		const url = baseUrl + "/filmes/get/" + filmeId;
		axios.get(url)
			.then(res => {
				if (res.data.success) {
					console.log(res.data.data[0]);
					const data = res.data.data[0];
					setdataFilme(data); // Corrigido aqui
					setcampId(data.id);
					setcampFoto(data.foto);
					setcampTitulo(data.titulo);
					setcampgeneros(data.Genero);
					setcampDescricao(data.descricao);
					setstringGenero(data.Genero.genero);
					setselectGeneros(data.GeneroId);
					console.log(data.Genero.genero);
					}
				else {
					/*alert("Error web service")*/

				}
			})
			.catch(error => {
				/*alert("Error server: " + error)*/
			})

			const url1 = baseUrl + "/generos/list" ;
		axios.get(url1)
			.then(res => {
				setGeneroide(res.data.data);
			})
			.catch(error => {
				alert("Error server: " + error)
			})
	
	
	
		}, []);
		console.log(Generoidelist);
	function sendUpdate() {
		// url de backend
		const url = baseUrl + "/filmes/update/" + filmeId
		const datapost = {
			foto: campFoto,
			titulo: campTitulo,
			GeneroId: selectGenero,
			descricao: campDescricao,
			
		}
		axios.put(url, datapost)
			.then(response => {
				if (response.data.success === true) {
					alert(response.data.message)
				}
				else {
					alert("Error1") 
				}
			}).catch(error => {
				alert("Error 34 " + error)
			})
	}
	
	const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        axios.post(baseUrl  + '/upload', formData, {
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
					<select
						id="inputState"
						className="form-control"
						value={selectGenero}
						onChange={value => setselectGeneros(value.target.value)}
					>
						<option defaultValue>Choose...</option>
						{Generoidelist.map(generos => (
							<option key={generos.id} value={generos.id}>
								{generos.genero}
							</option>
						))}
					</select>
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="inputDescricao">Descrição</label>
					<input type="text" className="form-control"
						placeholder="Descrição"
						value={campDescricao} onChange={(value) =>
							setcampDescricao(value.target.value)} />
				</div>
				
				
			</div>
			<br></br>
			<button type="submit" className="btn btn-primary" onClick={() => sendUpdate()}>Atualizar</button>
		</div>
	);
}
