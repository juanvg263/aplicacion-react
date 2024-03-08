import { Button } from 'primereact/button';
import React from 'react';
import Menu from "./Menu";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const Tareas = () => {

    const navigate = useNavigate();

    const [id, idchange] = useState("");
    const [titulo, titulochange] = useState("");
    const [descripcion, descripcionchange] = useState("");
    const [fecha, fechachange] = useState("");
    const [seleccionarPrioridad, prioridadChange] = useState(null);
    const [selectestado, estadochange] = useState("");
    const [categoria, categoriachange] = useState("");
    const [responsable, responsablechange] = useState("");

    const prioridad = [
        { tipo: 'Alta' },
        { tipo: 'Media' },
        { tipo: 'Baja' }
    ];

    const estado = [
        { estado: 'Terminada' },
        { estado: 'En Proceso' }
    ]

    const [tareas, setTareas] = useState([]);
    const [idEdit, setIdEdit] = useState("")

    const validarForm = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingresa un valor en: '
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Numero de tarea'
        }
        if (titulo === null || titulo === '') {
            isproceed = false;
            errormessage += ' Titulo'
        }
        if (descripcion === null || descripcion === '') {
            isproceed = false;
            errormessage += ' Descripción'
        }
        if (fecha === null || fecha === '') {
            isproceed = false;
            errormessage += ' Fecha'
        }
        if (seleccionarPrioridad === null || seleccionarPrioridad === '') {
            isproceed = false;
            errormessage += ' Prioridad'
        }
        if (selectestado === null || selectestado === '') {
            isproceed = false;
            errormessage += ' Estado'
        }
        if (categoria === null || categoria === '') {
            isproceed = false;
            errormessage += ' Categoria'
        }
        if (responsable === null || responsable === '') {
            isproceed = false;
            errormessage += ' Responsable'
        }
        if (!isproceed) {
            toast.warning(errormessage)
        }
        return isproceed
    }

    const agregar = (e) => {
        e.preventDefault();
        let objetos = { id, titulo, descripcion, fecha, seleccionarPrioridad, selectestado, categoria, responsable };
        //console.log(objetos);
        if (validarForm()) {

            fetch("http://localhost:8000/tareas", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(objetos)
            }).then((res) => {
                toast.success('Tarea agregada con exito')
                cerrarFormulario();
                return res.json();
            }
            ).then((data) => {
                setTareas([...tareas, data])
            }).catch((err) => {
                toast.error('Ha ocurrido un error :' + err.message)
            });
        }
    }

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login')
        }
        fetch("http://localhost:8000/tareas"
        ).then(response => response.json()
        ).then(data => {
            setTareas(data);
        }
        ).catch(error => {
            toast.error('Ha ocurrido un error al obtener las tareas ' + error.message)
        })
    }, [])

    const editarTarea = () => {
        const nuevosDatos = {
            titulo,
            descripcion,
            fecha,
            seleccionarPrioridad,
            selectestado,
            categoria,
            responsable
        }
        console.log(nuevosDatos);
        fetch(`http://localhost:8000/tareas/${idEdit}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(nuevosDatos)
        }
        ).then(response => {
            if (response.ok) {
                toast.success('Tarea editada exitosamente')
                setTareas(tareas.map(tarea => {
                    if (tarea.id === idEdit) {
                        return { ...tarea, ...nuevosDatos }
                    }
                    return tarea
                }))
                setIdEdit("");
                setFormEdit(false)
            } else {
                toast.error('Error al editar la tarea')
            }
        }).catch(error => {
            toast.error('Error en la solicitud de edicion: ', error)
            console.log(error);
        })
    }

    const eliminarTarea = (id) => {
        fetch(`http://localhost:8000/tareas/${id}`, {
            method: 'DELETE'
        }
        ).then(response => {
            if (response.ok) {
                toast.success('Tarea eliminada exitosamente')
                setTareas(tareas.filter(tarea => tarea.id !== id))
            } else {
                toast.error('Error al eliminar la tarea')
            }
        }).catch(error => {
            toast.error('Error en la solicitud para eliminar la tarea', error)
        })
    }

    const [FormAdd, setFormAdd] = useState(false);
    const [FormEdit, setFormEdit] = useState(false);

    const abrirFormulario = (id) =>{
        fetch(`http://localhost:8000/tareas/${id}`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(response => response.json()
        ).then(data => {
            idchange(data.id);
            titulochange(data.titulo);
            descripcionchange(data.descripcion);
            fechachange(data.fecha);
            prioridadChange(data.seleccionarPrioridad);
            estadochange(data.selectestado);
            categoriachange(data.categoria);
            responsablechange(data.responsable);
            setIdEdit(data.id)
            setFormEdit(!FormEdit)
        }).catch(error => {
            toast.error('Error al obtener los datos')
        })
    }

    const toggleFormulario = () => {
        setFormAdd(!FormAdd)
    }

    const cerrarFormulario = () => {
        setFormAdd(false);
    };

    const cerrarFormularioEdit = () => {
        setFormEdit(false);
        setIdEdit("");
    }

    return (
        <div>
            <Menu></Menu>
            <br></br>
            <h4 className="text-center" style={{ backgroundColor: 'rgb(36, 143, 118' }}>Mis Tareas</h4>
            <Button severity='success' onClick={toggleFormulario} label="Agregar Tareas" rounded style={{ marginLeft: '10px' }} />
            {FormAdd && (
                <div className='form-tarea'>
                    <form>
                        <div className='formtarea-head'>
                            <h3>Agregar una nueva tarea</h3>
                        </div>
                        <div>
                            <label>Numero de tarea:<span className="errmsg">*</span></label><br></br>
                            <InputText keyfilter="num" value={id} onChange={e => idchange(e.target.value)} type="text" id="numero" name="numero" ></InputText>
                        </div>
                        <div>
                            <label>Título:<span className="errmsg">*</span></label><br></br>
                            <InputText value={titulo} onChange={e => titulochange(e.target.value)} type="text" id="titulo" name="titulo" ></InputText>
                        </div>
                        <div>
                            <label>Descripción:<span className="errmsg">*</span></label><br></br>
                            <InputTextarea style={{height: '100px'}} value={descripcion} onChange={e => descripcionchange(e.target.value)} type="text" id="descripcion" name="descripcion" ></InputTextarea>
                        </div>
                        <div>
                            <label>Fecha Vencimiento:<span className="errmsg">*</span></label><br></br>
                            <Calendar style={{width: '75%'}} value={fecha} onChange={e => fechachange(e.target.value)} type="text" id="fecha" name="fecha" ></Calendar >
                        </div>
                        <div>
                            <label>Prioridad:<span className="errmsg">*</span></label><br></br>
                            <Dropdown style={{width: '50%'}} value={seleccionarPrioridad} onChange={e => prioridadChange(e.target.value)} options={prioridad} optionLabel='tipo' id="prioridad" name="prioridad" placeholder="Seleccionar Prioridad" className="w-full md:w-14rem"></Dropdown >
                        </div>
                        <div>
                            <label>Estado:<span className="errmsg">*</span></label><br></br>
                            <Dropdown style={{width: '50%'}} value={selectestado} onChange={e => estadochange(e.target.value)} options={estado} optionLabel='estado' id="estado" name="estado" placeholder="Estado de la tarea"></Dropdown>
                        </div>
                        <div>
                            <label>Categoría:<span className="errmsg">*</span></label><br></br>
                            <InputText keyfilter="num" value={categoria} onChange={e => categoriachange(e.target.value)} type="text" id="categoria" name="categoria" ></InputText>
                        </div>
                        <div>
                            <label>Responsable:<span className="errmsg">*</span></label><br></br>
                            <InputText value={responsable} onChange={e => responsablechange(e.target.value)} type="text" id="responsable" name="responsable" ></InputText>
                        </div>
                        <div>
                            <Button severity='success' onClick={agregar}>Agregar</Button> |
                            <Button severity='danger' onClick={cerrarFormulario}>Cancelar</Button>
                        </div>
                    </form>
                </div>
            )}

            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th>No. #</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Prioridad</th>
                        <th>Estado de Finalización</th>
                        <th>Categorías</th>
                        <th>Asignación de Responsables</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map(tarea => (
                        <tr key={tarea.id}>
                            <td>{tarea.id}</td>
                            <td>{tarea.titulo}</td>
                            <td>{tarea.descripcion}</td>
                            <td>{tarea.fecha}</td>
                            <td>{tarea.seleccionarPrioridad.tipo}</td>
                            <td>{tarea.selectestado.estado}</td>
                            <td>{tarea.categoria}</td>
                            <td>{tarea.responsable}</td>
                            <td>
                                <Button severity='info' onClick={() => abrirFormulario(tarea.id)}>Editar</Button>
                                <Button severity='danger' onClick={() => eliminarTarea(tarea.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {FormEdit && (
            <div>
                <form className='form-tarea'>
                    <div>
                        <h3>Editar Tarea</h3>
                    </div>
                    <div>
                        <label>Id:<span className="errmsg">*</span></label><br></br>
                        <InputText value={id} onChange={e => idchange(e.target.value)}  id="id" name="id" ></InputText>
                    </div>
                    <div>
                        <label>Título:<span className="errmsg">*</span></label><br></br>
                        <InputText value={titulo} onChange={e => titulochange(e.target.value)} type="text" id="titulo" name="titulo" ></InputText>
                    </div>
                    <div>
                        <label>Descripción:<span className="errmsg">*</span></label><br></br>
                        <InputTextarea value={descripcion} onChange={e => descripcionchange(e.target.value)} type="text" id="descripcion" name="descripcion" ></InputTextarea>
                    </div>
                    <div>
                        <label>Fecha Vencimiento:<span className="errmsg">*</span></label><br></br>
                        <Calendar style={{width: '75%'}} value={fecha} onChange={e => fechachange(e.target.value)} type="text" id="fecha" name="fecha" ></Calendar >
                    </div>
                    <div>
                        <label>Prioridad:<span className="errmsg">*</span></label><br></br>
                        <Dropdown style={{width: '50%'}} value={seleccionarPrioridad} onChange={e => prioridadChange(e.target.value)} options={prioridad} optionLabel='tipo' id="prioridad" name="prioridad" placeholder="Seleccionar Prioridad" className="w-full md:w-14rem"></Dropdown >
                    </div>
                    <div>
                        <label>Estado:<span className="errmsg">*</span></label><br></br>
                        <Dropdown  style={{width: '50%'}} value={selectestado} onChange={e => estadochange(e.target.value)} options={estado} optionLabel='estado' id="estado" name="estado" placeholder="Estado de la tarea"></Dropdown>
                    </div>
                    <div>
                        <label>Categoría:<span className="errmsg">*</span></label><br></br>
                        <InputText keyfilter="num" value={categoria} onChange={e => categoriachange(e.target.value)} type="text" id="categoria" name="categoria" ></InputText>
                    </div>
                    <div>
                        <label>Responsable:<span className="errmsg">*</span></label><br></br>
                        <InputText value={responsable} onChange={e => responsablechange(e.target.value)} type="text" id="responsable" name="responsable" ></InputText>
                    </div>
                    <div>
                        <Button severity='success' onClick={editarTarea}>Guardar Cambios</Button> |
                        <Button severity='danger' onClick={cerrarFormularioEdit}>Cancelar</Button>
                    </div>
                </form>
            </div>
            )}
        </div>
    )
}

export default Tareas;