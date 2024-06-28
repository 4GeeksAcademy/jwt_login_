import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate,Link} from "react-router-dom";


export const Demo = () => {
	const { store, actions } = useContext(Context);
console.log(store.user);
	return (
		<div className="container">
			<h1>User data</h1>
			<p>name: {store.user.name}</p>
			<p>username: {store.user.username}</p>
			<p>email: {store.user.email}</p>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
