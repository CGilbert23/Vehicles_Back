const express = require("express");
const app = express();

/*LOGS INFORMATION TO CONSOLE*/
const morgan = require("morgan");
app.use(morgan("dev"));


/*BODY PARSER FOR POST AND PUT REQUESTS: REQUEST AS JSON*/
app.use(express.json());

/*BODY PARSER FOR POST AND PUT REQUESTS: REQUEST AS STRINGS AND ARRAYS*/
app.use(
  express.urlencoded({
    extended: true,
  })
);

/*ERROR HANDLERS*/
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});




module.exports = app;
