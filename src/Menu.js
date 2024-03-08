import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

function Menu() {
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location = '/'; }
        },
        {
            label: 'Gestionar',
            icon: 'pi pi-folder',
            items: [
                { 
                    label: 'Tareas',
                     icon: 'pi pi-file-edit',
                     command: () => { window.location = '/tareas'; }
                },
                {
                    label : "Proyectos",
                    command: () => {window.location = '/proyectos'; }
                }
            ]
        },
        {
            label: 'Informacion',
            icon: 'pi pi-fw pi-envelope',
            command: () => { window.location = '/informacion' }
        },
    ];

    const end = (
        <div className="flex align-items-center gap-1">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> |
            <Link to={'/login'} className="btn btn-secondary"><i className="pi pi-sign-out"></i>Cerrar sesion</Link>
        </div>
    );

    return <Menubar className='header' model={items} end={end} />;
}

export default Menu;
