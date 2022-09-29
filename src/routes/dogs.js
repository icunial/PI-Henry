const { Router } = require("express");
const router = Router();

const { Dog, Temperament } = require("../db");
const { v4: uuidv4 } = require("uuid");

const dogController = require("../controllers/dogs");

const validations = require("../utils/validate");

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
      return res.status(404).json(`Dog with ID: ${id} not found!`);
    else res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const apiResults = await dogController.findByNameApi(name);
      const dbResults = await dogController.findByNameDb(name);
      const results = dbResults.concat(apiResults);
      if (!results.length)
        return res.status(404).json(`Dog with name ${name} not found!`);

      return res.status(200).json(results);
    } else if (name === "") {
      return res.status(400).json(`You should enter a name!`);
    }

    const apiResults = await dogController.getAllApi();
    const dbResults = await dogController.getAllDb();
    return res.status(200).json(dbResults.concat(apiResults));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/filter/:opt", async (req, res) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "az") {
      results = await dogController.orderDogsFromAtoZ();
    } else if (opt === "za") {
      results = await dogController.orderDogsFromZtoA();
    } else if (opt === "more") {
      results = await dogController.orderDogsMoreWeight();
    } else if (opt === "less") {
      results = await dogController.orderDogsLessWeight();
    } else {
      return res.status(404).json("No filter available");
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/temperaments/:temperament", async (req, res) => {
  const { temperament } = req.params;
  try {
    if (temperament) {
      const apiResults = await dogController.findByTemperamentApi(temperament);
      const dbResults = await dogController.findByTemperamentDb(temperament);
      const results = dbResults.concat(apiResults);
      if (!results.length)
        return res
          .status(404)
          .json(`Dogs with temperament ${temperament} not found!`);

      return res.status(200).json(results);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/from/:from", async (req, res) => {
  const { from } = req.params;

  try {
    if (from === "db") {
      const dbResults = await dogController.getAllDb();
      if (!dbResults.length)
        return res
          .status(404)
          .json("There are not dogs saved in the Database!");
      return res.status(200).json(dbResults);
    }

    if (from === "api") {
      const apiResults = await dogController.getAllApi();
      if (!apiResults.length)
        return res.status(404).json("There are not dogs saved in the Api!");
      return res.status(200).json(apiResults);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const dog = req.body;

  if (validations.validateName(dog.name))
    return res.status(400).json(validations.validateName(dog.name));

  if (validations.validateHeight(dog.min_height, dog.max_height))
    return res
      .status(400)
      .json(validations.validateHeight(dog.min_height, dog.max_height));

  if (validations.validateWeight(dog.min_weight, dog.max_weight))
    return res
      .status(400)
      .json(validations.validateWeight(dog.min_weight, dog.max_weight));

  if (validations.validateLifeSpan(dog.min_life_span, dog.max_life_span))
    return res
      .status(400)
      .json(validations.validateLifeSpan(dog.min_life_span, dog.max_life_span));

  try {
    if (!dog.temperaments) {
      const dogCreated = await Dog.create({
        ...dog,
        weight: dog.min_weight + " - " + dog.max_weight,
        height: dog.min_height + " - " + dog.max_height,
        life_span: dog.min_life_span + " - " + dog.max_life_span + " years",
        id: uuidv4(),
      });
      return res.status(201).json(dogCreated);
    }

    const dogCreated = await Dog.create({
      ...dog,
      weight: dog.min_weight + " - " + dog.max_weight,
      height: dog.min_height + " - " + dog.max_height,
      life_span: dog.min_life_span + " - " + dog.max_life_span + " years",
      id: uuidv4(),
    });

    dog.temperaments.forEach(async (temperament) => {
      const temperamentFound = await Temperament.findOne({
        where: { name: temperament },
      });

      temperamentFound.addDog(dogCreated.id);
    });

    res.status(201).json(dogCreated);
  } catch (error) {
    res.status(400).json("Error creating a dog!");
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
    const result = await dogController.updateDogFromDb(id, name);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
