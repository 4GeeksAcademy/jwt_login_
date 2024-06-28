import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate(); // Obtener la función navigate
    const [data, setData] = useState({
        email: "",
        password: ""
        
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
        const result = await actions.login(data.email, data.password);
        if (result) {
            navigate("/demo"); 
        } else {
            alert("login failed"); // Manejar el caso de fallo de login
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
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
                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;