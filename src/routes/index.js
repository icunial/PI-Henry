const { Router } = require("express");
const { dirname } = require("path");
const path = require("path");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogs");
const temperamentsRouter = require("./temperaments");
const commentsRouter = require("./comments");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* router.get("/", (req, res) => {
  res.send("The server is up!");
}); */

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);
router.use("/comments", commentsRouter);

module.exports = router;
