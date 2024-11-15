//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
const urli = "http://localhost:3000";

export default function ListComponent() {

	const [data, setdata] = useState([]);
	useEffect(() => {
		Loadfilmes();
	}, []);

	function Loadfilmes() {
		const url = "http://localhost:3000/filmes/list";
		axios.get(url)
			.then(res => {
				if (res.data.sucess) {
					const data = res.data.data;
					setdata(data);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error Web Service!'
					});
				}
			})
			.catch(error => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: error.message
				});
			});
	}

	function LoadFillData() {
		const sortedData = data.sort((a, b) => Number(a.id) - Number(b.id));
		return sortedData.map((data, index) => {
			return (
				<tr key={index}>
					<th>{data.id}</th>
					<td><img src= {`${urli}/uploads/${data.foto}`}alt={data.titulo} with={50} height={50}/></td>
					<td>{data.titulo}</td>
					<td>{data.Genero.genero}</td>
					<td>{data.descricao}</td>
					<td>
						<Link className="btn btn-secondary " to={"/edit/" + data.id} >Editar</Link>
					</td>
					<td>
						<button className="btn btn-danger" onClick={() => OnDelete(data.id)}> Eliminar</button>
					</td>
				</tr>
			)
		});
	}

	function OnDelete(id) {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this imaginary file!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				SendDelete(id)
			} else if (result.dismiss ===
				Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				)
			}
		})
	}

	function SendDelete(userId) {
		// url do backend
		const baseUrl = "http://localhost:3000/filmes/delete"
		const url = `${baseUrl}/${userId}`;
		// network
		axios.get(url)
			.then(response => {
				if (response.data.success) {
					Swal.fire(
						'Deleted!',
						'Your filme has been deleted.',
						'success'
					)
					Loadfilmes()
				}
			})
			.catch(error => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Error 325'
				});
			})
	}

	return (
		<table className="table table-hover table-striped">
			<thead className="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Foto</th>
					<th scope="col">Título</th>
					<th scope="col">Genero</th>
					<th scope="col">Descricao</th>
					<th colSpan="2"></th>
				</tr>
			</thead>
			<tbody>

				<LoadFillData />
			</tbody>
		</table>
	);	
}