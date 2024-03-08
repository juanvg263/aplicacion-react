import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import Menu from "./Menu";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login')
        }
    }, []);
    return (
        <div>
            <Menu></Menu>
            <h1 className="text-center">Bienvenido</h1>
            <br></br>
            <h2 className="text-center"> 
                Gestiona tus proyectos y tareas
            </h2>
            <div>
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h4 className="texto-home">Tareas</h4>
                            <div className="carousel-caption"></div>
                            <img src="https://i.blogs.es/e33ddf/gestion-de-tareas/1366_2000.jpg" style={{width: '550px', height: '350px', marginLeft:'30%'}} alt="Nombre de la imagen" />
                        </div>
                        <div className="carousel-item">
                            <h4 className="texto-home">Proyectos</h4>
                            <div className="carousel-caption"></div>
                            <img src="https://media.licdn.com/dms/image/C4E0DAQERR8JN_Yilsg/learning-public-crop_288_512/0/1646917642891?e=2147483647&v=beta&t=-vZgxZaRp_c8hkXxZNU6lpMs3RnAbpY7ZwmbusezlAc" style={{width: '550px', height: '350px', marginLeft:'30%'}} alt="Nombre de la imagen" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;