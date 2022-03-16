import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

import {Link} from "react-router-dom";
import bob from "./Bob.jpg";


const urlGet = "http://localhost:8000/api/v1/profile/"+localStorage.getItem('id');

const urlPut = "http://localhost:8000/api/v1/profile/"+localStorage.getItem('id');

const Profile = () => {
    const [datos,setDatos] = useState({})
    const [form,setForm] = useState(null)
    const [edit,setEdit] = useState(true)
    useEffect(() => {
        get()
    }, []);


    const get = async ()  => {
        const dato = await fetch(urlGet, {
            method: 'GET',
            headers: {
                'Authorization': 'token '+localStorage.getItem('token')
            }
        })

        const data =   await dato.json()
        setDatos(data)
    }

    const pot = () => {
        const newF = new FormData();

        if(form == null){
            newF.append("username", datos.username);
            newF.append("last_name", datos.last_name);
            newF.append("first_name", datos.first_name);
            newF.append("email", datos.email);

            put(newF)
        }else{
            form.append("username", datos.username);
            form.append("last_name", datos.last_name);
            form.append("first_name", datos.first_name);
            form.append("email", datos.email);
            put(form)
        }

    }


    const put = async (data)  => {


        const datas = await fetch(urlPut,{
            method: 'PUT',
            body: data,
            headers: {
                'Authorization': 'token '+localStorage.getItem('token'),
            }
        })
        
        const dato = await datas.json();
        if (datas.ok){
            alert("Datos actualizados")
            limpiarInputfile()
            get()
            setEdit(true)
        }else{
            console.log(dato)
            alert("Error al actuaslizar")
            get()
        }


    }


    function limpiarInputfile() {
        document.getElementById("file").value ='';
        setForm(null)
    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    const handleChangeF = (e) => {
        const formData = new FormData();
        formData.append("img_profile", e.target.files[0]);
        setForm(formData)
        console.log((formData))
    }

    const delLocalData = ()=>{
        window.localStorage.setItem('id', null);
        window.localStorage.setItem('token', null);
    }


    return(
        <div className="loginformu">


                <Link className={"linki"} to={"/login"} onClick={()=> delLocalData()}>Back</Link>


                <div className="imagen12">
                    <img src={datos.img_profile != null ? datos.img_profile : bob}/>
                </div>

                <div className="fil">
                    <input type="file" name="file" id="file" className="botoncito" onChange={handleChangeF}  />

                </div>
                <br></br>
                    <input  type= "text"  name="username" className="loginin" placeholder="Username" onChange={handleChange} value={datos.username}  />
                    <input  type= "text"  name="first_name" className="loginin" placeholder="First Name" onChange={handleChange} value={datos.first_name}  />
                    <input  type= "text"  name="last_name" className="loginin" placeholder="Last Name" onChange={handleChange} value={datos.last_name}  />
                    <input  type= "text"  name="email"  className="loginin" placeholder="Email" onChange={handleChange} value={datos.email}  />
                <br></br>
                <div className="edit">
                    <button onClick={()=> pot()} className="botoncito">Actualizar</button>
                </div>


            
        </div>

    )
}

export default Profile;