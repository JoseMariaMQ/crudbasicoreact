import React, {useState} from 'react'
import uniqid from 'uniqid'

const Listadonombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListanombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError('El campo nombre está vacío')
            return
        }
        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setListanombres([...listanombres, nuevoNombre])
        setNombre('')
        setError(null)
    }
    const deleteNOmbre = (id) => {
        const nuevoArray = listanombres.filter(item => item.id !== id)
        setListanombres(nuevoArray)
    }
    const editar = (item) => {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }
    const editarNombre = (e) => {
        e.preventDefault()
        if (!nombre.trim()) {
            setError('El campo nombre está vacío')
            return
        }
        const nuevoArray = listanombres.map(item => item.id === id ? {id:id, tituloNombre:nombre} : item)
        setListanombres(nuevoArray)
        setModoEdicion(false)
        setNombre('')
        setError(null)
    }

    return (
        <div>
            <h2>Aplicación de CRUD Básica</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listanombres.map(item =>
                                <li key={item.id} className="list-group-item">
                                    {item.tituloNombre}
                                    <button onClick={() => {deleteNOmbre(item.id)}} className="btn btn-danger float-right">
                                        BORRAR
                                    </button>
                                    <button onClick={() => {editar(item)}} className="btn btn-info float-right mr-1">
                                        EDITAR
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                        <input
                            onChange={(e) => {setNombre(e.target.value)}}
                            className="form-control mb-3" type="text"
                            placeholder="Introduce el nombre"
                            value={nombre}
                        />
                        <input
                            className="btn btn-info btn-block"
                            type="submit"
                            value={modoEdicion ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE'}/>
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listadonombres