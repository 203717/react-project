import {useState} from "react";


const urlPost = "http://localhost:8000/api/v1/register/"

const Register = () => {
    const [datos,setDatos] = useState({})

    const pot = (dat) => {
        const peticion = {
            method: 'POST',
            body: JSON.stringify(dat),
            headers: {
                "Content-type": "application/json",
                'Authorization': "Token 2b6d1f7cd82f35b6759802ac8550dded5e7bb613"
            }
        }
        post(peticion)
    }

    const post = async (peticion)  => {
        const data = await fetch(urlPost,peticion)
        const dato = await data.json();
        console.log(dato)
    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    return(
        <div>
            <input  type= "text"  name="username" placeholder="username" onChange={handleChange}  />
            <input  type= "password"  name="password" placeholder="password" onChange={handleChange} />
            <input  type= "text"  name="email" placeholder="email" onChange={handleChange} />

            <button onClick = {()=> pot(datos)} > Register</button>
        </div>
    )
}

export default Register;