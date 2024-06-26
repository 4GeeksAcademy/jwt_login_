import React, { useContext, useState } from "react";
import { Context } from "../appContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate(); // Obtener la función navigate
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        name: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const result = await actions.signup(data.email, data.username, data.password, data.name);
        if (result) {
            navigate("/login"); // Navegar a la ruta de login después del registro exitoso
        } else {
            console.log("Signup failed"); // Manejar el caso de fallo de registro
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;