const sql = require("./db.js");

const Tarea = function(tarea){
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.prioridad = tarea.prioridad;
    this.completado = tarea.completado;
};

Tarea.create =(newTarea, result) => {
    sql.query("INSERT INTO tareas SET ?", newTarea, (err, res) =>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("created customer: ", {id: res.insertId, ...newTarea});
        result
    });
};

Tarea.findById= (tareaId, result)=>{
    sql.query('SELECT * FROM tareas WHERE id = ${tareaId}',(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("tarea : ",res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);

    });
};


Tarea.getAll = result => {
    sql.query("SELECT * FROM tareas", (err,res) =>{
        if(err){
            console.log("error: ",err);
            result(null, err);
            return;
        }

        console.log("tareas: ",res);
        result(null, res)
    });
};

Tarea.updateById = (id,tarea,result) => {
    sql.query("UPDATE tareas SET titulo=?, descripcion=?, prioridad=?, completado=? WHERE id = ?",
    [tarea.titulo, tarea.descripcion, tarea.prioridad,tarea.completado, id],
    (err, res)=>{
        if(err){
            console.log("error: ",err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("tarea actualizada: ",{id: id, ...tarea});
        result(null, {id: id, ...tarea});
    }
    );
};

Tarea.remove =(id, result) =>{
    sql.query("DELETE FROM tareas WHERE id=?", id, (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }

        console.log("tarea eliminada con el id: ",id);
        result(null,res);
    });
};



module.exports = Tarea;