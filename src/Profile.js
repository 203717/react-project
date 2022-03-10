import {useEffect, useState} from "react";

const urlGet = "http://localhost:8000/api/v2/register/"+window.localStorage.getItem('id')

const Login = () => {
    const [datos,setDatos] = useState({})
    const [form,setForm] = useState(null)
    useEffect(() => {
        get()
    }, []);



    const pot = () => {
        const peticion = {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                "Content-type": "application/json"
            }
        }
        put(peticion)
    }

    const pot2 = (dat) => {
        const peticion = {
            method: 'PUT',
            body: dat,
            headers: {
                "Content-type": "application/json"
            }
        }
        put(peticion)
    }


    const put = async (peticion)  => {
        const data = await fetch(urlPut,peticion)
        const dato = await data.json();

        if (data.ok){
            alert("Actualizado correctamente")
            get()
        }else{
            alert("Error al actualizar")
        }
    }

    const get = async ()  => {
        const dato = await fetch(urlGet)
        const data =   await dato.json()
        setDatos(data)
    }


    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }
    const handleChangeF = (e) =>{
        const formData = new FormData();
        console.log(e.target.files[0].name)
        formData.append("file", e.target.files[0]);
        formData.append("fileName","img_profile");

        setForm(formData)
        console.log(formData)
    }

    return(
        <div>
            {/*<h1>{window.localStorage.getItem('id')} </h1>*/}
            <Card style={{ width: '90rem' , height:'38rem', top:'40px'}} className="container card_profile">
                <Card.Body>
                    <img src={datos.img_profile != null ? datos.img_profile : "http://localhost:8000/assets/img_profile/icono.jpg"}/>

                    <input  type= "text"  name="username" onChange={handleChange} value={datos.username} />
                    <input  type= "text"  name="first_name" onChange={handleChange} value={datos.first_name} />
                    <input  type= "text"  name="last_name" onChange={handleChange} value={datos.last_name} />
                    <input  type= "text"  name="email" onChange={handleChange} value={datos.email} />
                    <input  type= "file"  name="img_profile" onChange={handleChangeF}  />

                <button onClick={()=> console.log(datos)}>PRESIONAR</button>
                <button onClick={()=> pot()}>Actualizar</button>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Profile;