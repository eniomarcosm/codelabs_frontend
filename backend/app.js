const config = require("config");
const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const session = require("express-session");
const usuario = require("./src/routes/usuarioRoute");
const contentor = require("./src/routes/contentorRoute")
const danos = require("./src/routes/danosRoute")

const app = express();
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use(cors());
app.use(express.json());

const auth = require("./src/routes/authRoute.js");

app.use("/api/auth", auth);
app.use("/api/usuario", usuario);
app.use("/api/contentor", contentor);
app.use("/api/danos", danos);



const port = process.env.PORT || 3009;
app.listen(port, () => console.log(`Listining on port ${port}...`));