import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const baseUrl = "http://localhost:3000";

export default function EditComponent() {
	
	const [campgenero, setcampgeneros] = useState("");
	
	const { generoId } = useParams();

	useEffect(() => {
		const url = baseUrl + "/generos/get/" + generoId;
		console.log(url);
		axios.get(url)
			.then(res => {
				if (res.data.success) {
					const data = res.data.data[0];
					
					setcampgeneros(data.genero);
				}
				
				
			})
			.catch(error => {
				alert("Escreve!!!!")
			})
	}, []);
	function sendUpdate() {
		// url de backend
		const url = baseUrl + "/generos/update/" + generoId
		const datapost = {
			
			genero: campgenero,
			
		}
		axios.put(url, datapost)
			.then(response => {
					alert(response.data.message)
				
		
				
			}).catch(error => {
				alert("Error 34 " + error)
			})
	}
	
	return (
		<div>
			<div className="form-row justify-content-center">
			<div className="form-group col-md-6">
					<label htmlFor="inputgenero">Genero</label>
					<input type="text" className="form-control"
						placeholder="Escreve um Genero"
						value={campgenero} onChange={(value) =>
							setcampgeneros(value.target.value)} />
			
				</div>
				
			</div>
			<br></br>
			
			<button type="submit" className="btn btn-primary" onClick={() => sendUpdate()}>Alterar</button>
		</div>
	);
}
