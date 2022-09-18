const { Router } = require("express");
const { dirname } = require("path");
const path = require("path");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogs");
const temperamentsRouter = require("./temperaments");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* router.get("/", (req, res) => {
  res.send("The server is up!");
}); */

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
