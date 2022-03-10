import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

const urlPost = "http://localhost:8000/api/v1/login/"

const Login = () => {
    const [datos,setDatos] = useState({})
    const [shown, setShown] = useState(false)

   const pot = (dat) => {
        const peticion = {
            method: 'POST',
            body: JSON.stringify(dat),
            headers: {
                "Content-type": "application/json"
            }
        }
        post(peticion)
    }

    const post = async (peticion)  => {

        const data = await fetch(urlPost,peticion)
        const dato = await data.json();


        if (data.ok){
            window.localStorage.setItem('id', dato.user_id);
            window.localStorage.setItem('token', dato.token);

            window.location = "/profile"
        }else{
            alert("Error de inicio de sesion")
        }

    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    const switchShown = () => setShown(!shown);


    return(


            <div>
                    <div className="login">
                        <h1>Login</h1>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="text" className="form-control input_login" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="radio"  aria-label="Radio button for following text input" onClick={switchShown}  className={"login_butonpass"}/>
                            </div>
                        </div>
                        <input type={shown ? 'text' : 'password'} class="form-control" aria-label="Text input with radio button" name="password" placeholder="Contraseña" onChange={handleChange}  />

                    </div>

                    <button type="submit" onClick = {()=> pot(datos)} class="btn btn-light">Iniciar sesion</button>
                    <Link  className="input_new"  to="/register"><button type="submit"  class="btn btn-info">Regitsarte</button></Link>
                </div>
    )
}

export default Login;