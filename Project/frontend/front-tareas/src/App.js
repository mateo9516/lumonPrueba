import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AgregarTarea from "./components/agregarTarea.component";
import Tarea from "./components/tarea.component";
import ListaTareas from "./components/listaTareas.component"; 

class App extends Component{
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tareas" className="navbar-brand">
            Prueba Mateo Echeverry
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tareas"} className="nav-link">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/agregar"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tareas"]} component={ListaTareas} />
            <Route exact path="/agregar" component={AgregarTarea} />
            <Route path="/tareas/:id" component={Tarea} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
