import {useState} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"


const urlPost = "http://localhost:8000/api/v2/register/"

const Login = () => {
    const [datos,setDatos] = useState({})
    const [shown, setShown] = useState(false)

    const pot = (dat) => {
        console.log(dat)
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

        if (data.statusText != "Bad Request"){
            alert("Registro Exitoso")
            window.location= "/login"
        }else{
            alert("Verifique bien los campos")
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

            <Link className={"back_login"}  to={"/login"} >regresar</Link>
            <div className={"text_register"}><span>Registro</span></div>
            <div className="dropdown-divider line_register"></div>

                <div className="form-group ">
                    <label >Username</label>
                    <input type="text" className="form-control input_register" name="username" placeholder="username" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type={shown ? 'text' : 'password'}  className="form-control input_register" name="password" placeholder="password" onChange={handleChange}   />
                </div>
                <div className="form-group">
                    <label >Password2</label>
                    <input type={shown ? 'text' : 'password'} className="form-control input_register" name="password2" placeholder="password2" onChange={handleChange}   />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control input_register" name="email" placeholder="email" onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label >First name</label>
                    <input type="text" className="form-control input_register" name="first_name" placeholder="first name" onChange={handleChange}  />
                </div>

                <div className="form-group">
                    <label >Last name</label>
                    <input type="text" className="form-control input_register" name="last_name" placeholder="last name" onChange={handleChange}  />
                </div>

                <button type="submit" onClick = {()=> pot(datos)} class="btn btn-light">Registarse</button>
        </div>
    )
}

export default Login;