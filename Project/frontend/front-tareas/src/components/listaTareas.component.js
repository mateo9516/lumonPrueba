import React, {Component} from "react";
import TareaDataService from "../services/tarea.service";
import {Link} from "react-router-dom";

export default class ListaTareas extends Component{
    constructor(props){
        super(props);
        this.listarTareas = this.listarTareas.bind(this);
        this.refrescarLista = this.refrescarLista.bind(this);
        this.setTareaActiva = this.setTareaActiva.bind(this);

        this.state = {
            tareas : [],
            tareaActual: null,
            indiceActual: -1,
        };
    }

    componentDidMount(){
        this.listarTareas();
    }


    listarTareas(){
        TareaDataService.getAll()
        .then(response => {
            this.setState({
                tareas: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refrescarLista(){
        this.listarTareas();
        this.setState({
            tareaActual:null,
            indiceActual:-1
        });
    }

    setTareaActiva(tarea, index){
        this.setState({
            tareaActual: tarea,
            indiceActual: index
        });
    }

    render(){
        const {tareas, tareaActual, indiceActual} = this.state;

        return(
        <div className="list row">
        <div className="col-md-6">
          <h4>Lista de Tareas</h4>

          <ul className="list-group">
            {tareas &&
              tareas.map((tarea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indiceActual ? "active" : "")
                  }
                  onClick={() => this.setTareaActiva(tarea, index)}
                  key={index}
                >
                  {tarea.titulo}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {tareaActual ? (
            <div>
              <h4>Tarea</h4>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {tareaActual.titulo}
              </div>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {tareaActual.descripcion}
              </div>
              <div>
                <label>
                  <strong>Prioridad:</strong>
                </label>{" "}
                {tareaActual.prioridad}
              </div>
              <div>
                <label>
                  <strong>estado:</strong>
                </label>{" "}
                {tareaActual.completado ? "completada": "No completada"}
              </div>

              <Link
                to={"/tareas/" + tareaActual.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Elija una Tarea...</p>
            </div>
          )}
        </div>
      </div>
        );
    }
}