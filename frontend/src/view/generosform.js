import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function EditComponent() {
	const [campgenero, setcampgeneros] = useState("");

	
	return (
		<div>
			<div className="form-row justify-content-center">
				
				<div className="form-group">
				<label htmlFor="inputgenero">Genero</label>
				<input type="text" className="form-control"
					id="inputgenero" placeholder="Define o Genero"
					value={campgenero} onChange={(value) =>
						setcampgeneros(value.target.value)} />
			</div>
				
			</div>
			
			
			<button type="submit" className="btn btn-primary"
				onClick={() => SendSave()}>Guardar</button>
		</div>
	);
	function SendSave() {
		
	 if (campgenero === "") {
			alert("Insert Genero!")
		}
		else {
			
			const createUrl = "http://localhost:3000/generos/create"
			const datapost = {
			
			genero: campgenero
			
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