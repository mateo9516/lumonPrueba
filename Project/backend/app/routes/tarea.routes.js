module.exports = app =>{
    const tareas = require("../controllers/tarea.controller");

    //crear nueva
    app.post("/tareas", tareas.create);
    //todas las tareas
    app.get("/tareas", tareas.findAll);
    //una tarea
    app.get("tareas/:tareaId", tareas.findOne);
    //actualizar una tarea
    app.put("/tareas/:tareaId", tareas.update);
    //Borrar una tarea
    app.delete("/tareas/:tareaId", tareas.delete);


}