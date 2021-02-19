const express = require ("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.json({message:"Bienvenido al back de la prueba"});
});

app.use(express.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Allow','GET,POST,PUT,DELETE');
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    req.header('Access-Control-Allow-Methods', '*');
    req.header('Allow','GET,POST,PUT,DELETE');
    next();
  
  });


require("./app/routes/tarea.routes")(app);

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log('servidor arriba en 8080');
});