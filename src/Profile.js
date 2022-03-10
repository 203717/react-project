import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import bob from "./Bob.jpg"

const urlGet = "http://localhost:8000/api/v1/profile/"+window.localStorage.getItem('id')

const urlPut = "http://localhost:8000/api/v1/profile/"+window.localStorage.getItem('id')

const Login = () => {
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
                'Authorization': 'token '+window.localStorage.getItem('token')
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
                'Authorization': 'token '+window.localStorage.getItem('token'),
            }
        })
        const dato = await datas.json();

        if (datas.ok){
            alert("Datos actualizados")
            limpiarInputfile()
            get()
            setEdit(true)
        }else{
            alert("Error al actualizar")
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
        <div>

            <Card style={{ width: '55rem' , height:' 30rem', top:'40px' }} className="container card_profile">

                <Link className={"log_out_link"} to={"/login"} onClick={()=> delLocalData()}>Log out</Link>


                <Card.Body style={{ height: '2em' }}>
                    <img src={datos.img_profile != null ? datos.img_profile : bob}/>
                </Card.Body>

                <div className="fil">
                    <input type="file" name="file" id="file" className="inputfile" onChange={handleChangeF}  />
                    <label htmlFor="file">Cambiar foto</label>

                </div>

                <div className="user_last">
                    <label className="label_profile">Username</label>
                    <input  type= "text"  name="username" onChange={handleChange} value={datos.username} disabled={edit} />
                    <label className="label_profile">Last name</label>
                    <input  type= "text"  name="last_name" onChange={handleChange} value={datos.last_name} disabled={edit} />
                </div>

                <div className="first_ema" >
                    <label className="label_profile2" >First name</label>
                    <input  type= "text"  name="first_name" onChange={handleChange} value={datos.first_name} disabled={edit} />
                    <label className="label_profile3">Email</label>
                    <input  type= "text"  name="email" onChange={handleChange} value={datos.email} disabled={edit} />
                </div>

                <div className="edit"    >
                    <button onClick={()=> setEdit(!edit)}>Editar datos</button>
                    <button onClick={()=> pot()} className="actuali">Actualizar</button>
                </div>


            </Card>
        </div>

    )
}

export default Login;