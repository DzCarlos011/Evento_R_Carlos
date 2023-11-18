const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "eventos",
    port: 3309,
});

app.post("/create", (req, res) => {
    const { nombre, hora, fecha, direccion, estado, precio, contacto } = req.body;

    db.query(
        'INSERT INTO eventos(nombre, hora, fecha, direccion, estado, precio, contacto) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, hora, fecha, direccion, estado, precio, contacto],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("NO SE REGISTRO");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/eventos", (req, res) => {
    db.query('SELECT * FROM eventos', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("NO SE ENCONTRARON");
        } else {
            res.send(result);
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});