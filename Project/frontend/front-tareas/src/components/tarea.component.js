import React, {Component} from "react";
import TareaDataService from "../services/tarea.service";

export default class Tarea extends Component{
    constructor(props){
        super(props);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangePrioridad = this.onChangePrioridad.bind(this);
        this.getTarea = this.getTarea.bind(this);
        this.updateTarea = this.updateTarea.bind(this);
        this.deleteTarea = this.deleteTarea.bind(this);
        this.updateCompletado = this.updateCompletado.bind(this);

        this.state={
            tareaActual:{
                id: null,
                titulo:"",
                descripcion:"",
                prioridad:0,
                completado: false
            },
            mensaje:""
        };
    }

    componentDidMount(){
        this.getTarea(this.props.match.params.id);
    }

    onChangeTitulo(e){
        const titulo = e.target.value;

        this.setState(function(prevState){
            return{
                tareaActual:{
                    ...prevState.tareaActual,
                    titulo:titulo
                }
            };
        });
    }

    onChangeDescripcion(e){
        const descripcion = e.target.value;

        this.setState(prevState => ({
            tareaActual:{
                ...prevState.tareaActual,
                descripcion:descripcion
            }
        }));
    }

    onChangePrioridad(e){
        const prioridad = e.target.value;

        this.setState(prevState => ({
            tareaActual:{
                ...prevState.tareaActual,
                prioridad:prioridad
            }
        }));
    }

    getTarea(id){
        TareaDataService.get(id)
        .then(response =>{
            this.setState({
                tareaActual: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateCompletado(status){
        var data = {
            id: this.state.tareaActual.id,
            titulo: this.state.tareaActual.titulo,
            descripcion: this.state.tareaActual.descripcion,
            prioridad: this.state.tareaActual.prioridad,
            completado: status
        };

        TareaDataService.update(this.state.tareaActual.id, data)
        .then(response =>{
            this.setState(prevState => ({
                tareaActual:{
                    ...prevState.tareaActual,
                    completado: status
                }
            }));
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateTarea(){
        TareaDataService.update(
            this.state.tareaActual.id,
            this.state.tareaActual
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                mensaje: "La tarea fue actualizada correctamente"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteTarea(){
        TareaDataService.delete(this.state.tareaActual.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/tareas')
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){
        const {tareaActual} = this.state;

        return(
            <div>
        {tareaActual ? (
          <div className="edit-form">
            <h4>Tarea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={tareaActual.titulo}
                  onChange={this.onChangeTitulo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={tareaActual.descripcion}
                  onChange={this.onChangeDescripcion}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prioridad">Prioridad</label>
                <input
                  type="number"
                  className="form-control"
                  id="prioridad"
                  value={tareaActual.prioridad}
                  onChange={this.onChangePrioridad}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {tareaActual.completado ? "Completada" : "No completada"}
              </div>
            </form>

            {tareaActual.completado ? (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateCompletado(false)}
              >
                Incompleta
              </button>
            ) : (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateCompletado(true)}
              >
                Completada
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteTarea}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateTarea}
            >
              Actualizar
            </button>
            <p>{this.state.mensaje}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Seleccione una Tarea...</p>
          </div>
        )}
      </div>

        )
    }


}