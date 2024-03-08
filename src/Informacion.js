import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";




const Informacion = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        let username=sessionStorage.getItem('username');
        if(username === '' || username === null){
            navigate('/login')
        }
    }, []);

    return (
        <div className="text-center">
            <h1>
                Informacion de la aplicación
            </h1>
            <h3>
                Esta es una aplicacion que se nos pidio hacer en el r1 de la Unidad 2 en la materia de Aplicaciones Web para I4.0
            </h3>
            <br></br>
            <h4>
                Datos academicos
                
                
            </h4>
            <br></br>
            <h4>
                Nombre: Juan Jose Villegas Gonzalez
            </h4>
            <h4>
                Grupo: GDS0551
            </h4>
            <h4>
                Numero de Control: 1222100509
            </h4>
            <Link className="btn btn-danger" to={'/'}>Volver</Link>
        </div>
    )
}

export default Informacion;