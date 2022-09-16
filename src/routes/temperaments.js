const { Router } = require("express");
const router = Router();

const { Temperament } = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    let response = await axios.get("https://api.thedogapi.com/v1/breeds");

    let temperamentsFromApi = [];

    response = response.data.map((item) => {
      return item.temperament;
    });

    response.forEach((item) => {
      if (item !== undefined) {
        item.split(", ").forEach((i) => temperamentsFromApi.push(i));
      }
    });

    temperamentsFromApi = Array.from(new Set(temperamentsFromApi));

    const tempExist = await Temperament.findOne({
      where: {
        name: temperamentsFromApi[0],
      },
    });
    if (tempExist) {
      return res.status(200).json(await Temperament.findAll());
    }

    for (temperament of temperamentsFromApi) {
      await Temperament.create({ name: temperament });
    }

    res.status(200).json(await Temperament.findAll());
  } catch (error) {
    res.status(400).json("Temperaments cannot be shown!");
  }
});

module.exports = router;
