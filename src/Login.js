import {useState} from "react"; 


const urlPost = "http://localhost:8000/api/v1/Login/"

const Login = () => {
    const [datos,setDatos] = useState({})

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
        console.log(dato)
        if (data.ok){
            window.localStorage.setItem('id', dato.user_id);
            window.location = "/profile"
        }else{
            alert("Error de inicio de sesion")
        }
    }

    return(
        <div>
            <label>Nombre de usuario</label>
            <input  type= "text"  name="username" placeholder="user" />
            <label>Contraseña</label>
            <input  type= "password"  name="password" placeholder="password"  />

            <button type="submit" onClick = {()=> pot(datos)} > Login</button>
        </div>
    )
}

export default Login;