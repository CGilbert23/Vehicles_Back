const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connection");


const app = express();

/* CONNECT DATABASE */
connectDB();

/* INIT MIDDELWARE */
app.use(express.json({ extended: false }));

/* ENABLING CORS - ALLOWS REQUEST FROM ANY DOMAIN */
app.use(cors());

/* ENABLING STATIC PATH */
app.use(express.static("images"));

app.get(`/`, (req, res) => res.send("Api Running"));

/*DECLARE ROUTES*/
const applicants = require("./vehicles/router");

app.use(`/api/vehicles`, applicants); 

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
