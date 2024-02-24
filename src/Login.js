import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username,usernameupdate]=useState('');
    const [password,passwordupdate]=useState('');

    const usenavigate= useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[])

    const ProceedLogin = (e) => {
        e.preventDefault();
        if(validate()){
        //console.log('proceed')
        fetch("http://localhost:8000/usuarios/"+username).then((res)=>{
            return res.json();
        }).then((resp)=>{
            //console.log(resp);
            if(Object.keys(resp).length === 0){
                toast.error('Por favor ingresa un Nombre de Usuario valido')
            }else{
                if (resp.password === password){
                    toast.success('Inicio de sesión correcto');
                    sessionStorage.setItem('username', username);
                    usenavigate('/');
                }else{
                    toast.error('Por favor ingresa credenciales validas')
                }
            }
        }).catch((err)=>{
            toast.error('Error al incicar sesion: '+ err.message)
        })
        }
    }

    const validate=()=>{
        let result = true;
        if(username === '' || username === null){
            result = false;
            toast.warning('Por favor ingresa el nombre de usuario')
        }
        if(password === '' || password === null){
            result = false;
            toast.warning('Por favor ingresa la contraseña')
        }
        return result
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Login de Usuarios</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Nombre de Usuario <span className="errmsg">*</span></label>
                                <input value={username} onChange={e=>usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Contraseña <span className="errmsg">*</span></label>
                                <input value={password} onChange={e=>passwordupdate(e.target.value)} type="password" className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Ingresar</button> |
                              <Link className="btn btn-success" to={'/register'}>Nuevo Usuario</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;