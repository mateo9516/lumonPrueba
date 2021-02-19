const Tarea = require("../models/tarea.model");

exports.create =(req,res) => {
    if(!req.body){
        res.status(400).send({message: "no puede ser vacio"});
    }

    const tarea = new Tarea({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        completado: req.body.completado
    });


    Tarea.create(tarea, (err, data) =>{
        if(err)
          res.status(500).send({message: err.message || "ha ocurrido un error en la creacion de la tarea"});
         else res.send(data); 
    });
};


exports.findAll = (req, res) =>{
    Tarea.getAll((err, data) => {
        if(err)
            res.status(500).send({message:err.message || "ha ocurrido un error con el consumo de las tareas"});
        else res.send(data);
    });
};

exports.findOne = (req, res) =>{
    Tarea.findById(req.params.tareaId, (err, data) => {
        if(err){
            if(err.kind ==="not_found"){
                res.status(404).send({message: 'no se encontro la tarea con el id: ${req.params.tareaId}'});
            }else{
                res.status(500).send({message: "Error con la tarea "+ req.params.tareaId});
            }
        }else res.send(data);
    });
};

exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({message: "no puede ser vacio"});
    }

    Tarea.updateById(
        req.params.tareaId,
        new Tarea(req, body),
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({ message: "no se encontro la tarea con id: ${req.params.tareaId}"});
                }else{
                    res.status(500).send({message:"error al actualizar la tarea "+ req.params.tareaId});
                }
            }else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Tarea.remove(req.params.tareaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro ninguna tarea con id:  ${req.params.tareaId}.`
          });
        } else {
          res.status(500).send({
            message: "no se pudo eliminar la tarea con id " + req.params.customerId
          });
        }
      } else res.send({ message: 'borrado exitosamente' });
    });
  };
