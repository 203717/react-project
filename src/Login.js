import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
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
            localStorage.setItem('id', dato.user_id);
            localStorage.setItem('token', dato.token);

            window.location = "/profile";
        }else{
            alert("Error de inicio de sesion");
        }

    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    const switchShown = () => setShown(!shown);

    return(

        <div className="loginformu">
        <div className="login">
            <h2>Login</h2>
        </div>
        <div className="input-group mb-3">
            <input type="text" className="loginin" name="username" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange}/>
        </div>

        
        <div className="input-group">
        <div className="input-group-prepend">
            
        </div>
            <input type={shown ? 'text' : 'password'} className="loginin" aria-label="Text input with radio button" name="password" placeholder="Contraseña" onChange={handleChange}/>
            <div className="input-group-text">
                <input type="radio"  aria-label="Radio button for following text input" onClick={switchShown}  className={"login_butonpass"}/>
                <label htmlFor="exampleDropdownFormPassword1"> Mostrar Constraseña</label>
                </div>
        </div>
        <br></br><br></br>
        <button type="submit"  onClick = {()=> pot(datos)} className="botoncito">Iniciar sesion</button>
  
        <Link className="input_new"  to="/register"><button type="submit" className="botoncito2" >Regitsarte</button></Link>
        
        </div>
            
    )
}

export default Login;