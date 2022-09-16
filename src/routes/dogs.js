const { Router } = require("express");
const router = Router();

const { Dog, Temperament } = require("../db");
const { v4: uuidv4 } = require("uuid");

const dogController = require("../controllers/dogs");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let result = [];

  try {
    if (id.includes("-")) {
      result = await dogController.findDogByIdDb(id);
    } else {
      result = await dogController.findDogByIdApi(id);
    }
    if (!result.length)
      return res.status(200).json(`Dog with ID: ${id} not found!`);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", async (req, res) => {
  const { name, from } = req.query;

  try {
    if (name) {
      const apiResults = await dogController.findByNameApi(name);
      const dbResults = await dogController.findByNameDb(name);
      const results = dbResults.concat(apiResults);
      if (!results.length)
        return res.status(200).json(`Dog with name ${name} not found!`);

      return res.status(200).json(results);
    }

    if (from === "db") {
      const dbResults = await dogController.getAllDb();
      if (!dbResults.length)
        return res
          .status(200)
          .json("There are not dogs saved in the Database!");
      return res.status(200).json(dbResults);
    }

    if (from === "api") {
      const apiResults = await dogController.getAllApi();
      if (!apiResults.length)
        return res.status(200).json("There are not dogs saved in the Api!");
      return res.status(200).json(apiResults);
    }

    const apiResults = await dogController.getAllApi();
    const dbResults = await dogController.getAllDb();
    return res.status(200).json(dbResults.concat(apiResults));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const dog = req.body;

  if (!dog.name) return res.status(400).json("Name parameter is missing");
  if (!dog.height) return res.status(400).json("Height parameter is missing");
  if (!dog.weight) return res.status(400).json("Weight parameter is missing");

  try {
    if (!dog.temperaments) {
      const dogCreated = await Dog.create({ ...dog, id: uuidv4() });
      return res.status(201).json(dogCreated);
    }

    const dogCreated = await Dog.create({ ...dog, id: uuidv4() });

    dog.temperaments.forEach(async (temperament) => {
      const temperamentFound = await Temperament.findOne({
        where: { name: temperament },
      });

      temperamentFound.addDog(dogCreated.id);
    });
    res.status(201).json(dogCreated);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/filter/:opt", async (req, res) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "az") {
      results = await dogController.orderDogsFromAtoZ();
    }

    if (opt === "za") {
      results = await dogController.orderDogsFromZtoA();
    }

    if (opt === "more") {
      results = await dogController.orderDogsMoreWeight();
    }

    if (opt === "less") {
      results = await dogController.orderDogsLessWeight();
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dogController.deleteDogFromDbById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await dogController.updateDogFromDb(name);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
