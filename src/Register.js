import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import {Link} from "react-router-dom";


const urlPost = "http://localhost:8000/api/v2/register/";

const Register = () => {
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
            alert("Tabien XD")
        }else{
            alert("Los datos son incorrectos")
        }
    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    const switchShown = () => setShown(!shown);


    return(

        <form class="loginformu">

            <Link className={"linki"}  to={"/login"} > Back</Link>
            <br></br>
            <h2>Registro</h2>
            <div className="dropdown-divider line_register"></div>

                    <input type="text" className="loginin" name="username" placeholder="Username" onChange={handleChange} />
               
                    <input type={shown ? 'text' : 'password'}  className="loginin"  name="password" placeholder="Password" onChange={handleChange}   />
               
                    <input type={shown ? 'text' : 'password'} className="loginin" name="password2" placeholder="Second Password" onChange={handleChange}   />
               
                    <input type="email" className="loginin" name="email" placeholder="Email" onChange={handleChange}  />
               
                    <input type="text" className="loginin" name="first_name" placeholder="First Name" onChange={handleChange}  />
                
                    <input type="text" className="loginin" name="last_name" placeholder="Last Name" onChange={handleChange}  />
                
                <button type="submit" onClick = {()=> pot(datos)} className="botoncito">Registarse</button>
        </form>
    )
}

export default Register;