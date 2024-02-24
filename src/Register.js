import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () =>{

    const [id, idchange] = useState("");
    const [nombre, nombrechange] = useState("");
    const [password, passwordchange] = useState("");
    const [correo, correochange] = useState("");
    const [genero, generochange] = useState("mujer");

    const navigate= useNavigate();

    const IsValidate=()=>{
        let isproceed=true;
        let errormessage='Por favor ingresa un valor';
        if(id===null || id===''){
            isproceed = false;
            errormessage += ' Nombre de Usuario';
        }
        if(nombre===null || nombre===''){
            isproceed = false;
            errormessage += ' Nombre';
        }
        if(password===null || password===''){
            isproceed = false;
            errormessage += ' Contraseña';
        }
        if(correo===null || correo ===''){
            isproceed = false;
            errormessage += ' Correo';
        }
        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(correo)){

            }else{
                isproceed = false;
                toast.warning('Por favor ingresa un correo valido')
            }
        }
        return isproceed
    }
    
    const handlesubmit=(e)=>{
            e.preventDefault();
            let regobj={id,nombre,password,correo,genero};
            if(IsValidate()){
            //console.log(regobj)

            fetch("http://localhost:8000/usuarios",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify(regobj)
            }).then((res)=>{
                toast.success('Registro de usuario exitoso')
                navigate('/login');
            }).catch((err)=>{
                toast.success('Ha ocurrido un error :'+err.message);
            });
        }
    }

    return (
        <div>
            <div className="offset-lg-3 col-lg-6" onSubmit={handlesubmit}>
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <h1>Registrar nuevo usuarion</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="cki-lg-6">
                                    <div className="form-group">
                                        <label>Nombre Usuario<span className="errmsg"></span>*</label>
                                        <input value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="cki-lg-6">
                                    <div className="form-group">
                                        <label>Nombre Completo<span className="errmsg"></span>*</label>
                                        <input value={nombre} onChange={e=>nombrechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="cki-lg-6">
                                    <div className="form-group">
                                        <label>Contraseña<span className="errmsg"></span>*</label>
                                        <input type="password" value={password} onChange={e=>passwordchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="cki-lg-6">
                                    <div className="form-group">
                                        <label>Correo<span className="errmsg"></span>*</label>
                                        <input value={correo} onChange={e=>correochange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="cki-lg-6">
                                    <div className="form-group">
                                        <label>Genero</label>
                                        <br></br>
                                        <input type="radio" checked={genero === 'hombre'} onChange={e=>generochange(e.target.value)} name="genero" value='hombre' className="app-check"></input>
                                        <label>Hombre</label>
                                        <input type="radio" checked={genero === 'mujer'} onChange={e=>generochange(e.target.value)} name="genero" value='mujer' className="app-check"></input>
                                        <label>Mujer</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Registrar</button> |
                            <a className="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Register;