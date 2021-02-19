import React, {Component} from "react";
import TareaDataService from "../services/tarea.service";

export default class AgregarTarea extends Component{
    constructor(props){
        super(props);
        this.onChangetitulo = this.onChangetitulo.bind(this);
        this.onChangedescripcion = this.onChangedescripcion.bind(this);
        this.onChangeprioridad = this.onChangeprioridad.bind(this);
        this.onChangecompletado = this.onChangecompletado.bind(this);
        this.newTarea = this.newTarea.bind(this);
        this.saveTarea = this.saveTarea.bind(this);
    
        this.state ={
            id: null,
            titulo: "",
            descripcion: "",
            prioridad: 0,
            completado: false
        };
    }
    
    onChangetitulo(e){
        this.setState({
            titulo: e.target.value
        });
    }

    onChangedescripcion(e){
        this.setState({
            descripcion: e.target.value
        });
    }

    onChangeprioridad(e){
        this.setState({
            prioridad: e.target.value
        });
    }

    onChangecompletado(e){
        this.setState({
            completado: e.target.value
        });
    }

    saveTarea(){
        var data ={
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,
            prioridad: this.state.prioridad,
            completado: this.state.completado
        };

        TareaDataService.create(data)
        .then(response =>{
            this.setState({
                id: response.data.id,
                titulo: response.data.titulo,
                descripcion: response.data.descripcion,
                prioridad: response.data.prioridad,
                completado: response.data.completado,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    newTarea(){
        this.setState({
            id: null,
            titulo: "",
            descripcion: "",
            prioridad: 0,
            completado: false,

            submitted: false
        });
    }

    render(){
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Tarea Agregada Correctamente!</h4>
                    <button className="btn btn-success" onClick={this.newTarea}>
                            Agregar
                    </button>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                required
                                value={this.state.titulo}
                                onChange={this.onChangetitulo}
                                name="titulo"
                                />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descripcion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                required
                                value={this.state.descripcion}
                                onChange={this.onChangedescripcion}
                                name="descripcion"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="prioridad">Prioridad</label>
                            <input
                                type="number"
                                className="form-control"
                                id="prioridad"
                                required
                                value={this.state.prioridad}
                                onChange={this.onChangeprioridad}
                                name="prioridad"
                            />
                        </div>
                        <div class="form-check row">
                            <label class="form-check-label col-8" for="flexCheckDefault">Completada</label>
                            <input 
                                class="form-check-input col-4" 
                                type="checkbox" 
                                id="completado"
                                required
                                value={this.state.completado}
                                onChange={this.onChangecompletado}
                                name="prioridad"
                            />
                        </div>
                        <div class = "btn-group mt-3">
                        <button onClick={this.saveTarea} className="btn btn-success ">
                                Agregar
                        </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}