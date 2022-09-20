const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getAllApiConvertWeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    if (apiResults) {
      apiResults.data.forEach((r) => {
        if (r.weight !== "NaN") {
          if (r.id !== 232 && r.id !== 179)
            results.push({
              id: r.id,
              name: r.name,
              image: r.image.url,
              temperament: r.temperament
                ? convertTemperamentsToArray(r.temperament)
                : [],
              weightConvert: parseInt(r.weight.metric.substring(0, 2).trim()),
              weight: r.weight.metric,
            });
        }
      });
    }

    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from API");
  }
};

const getAllDbConvertWeight = async () => {
  const results = [];
  try {
    const dbResults = await Dog.findAll({
      attributes: ["id", "name", "image", "weight"],
      include: Temperament,
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        temperament: r.temperaments.map((t) => t.name),
        weightConvert: parseInt(r.weight.substring(0, 3).trim()),
        weight: r.weight,
      });
    });

    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from DB");
  }
};

const convertTemperamentsToArray = (temperaments) => {
  const temperamentsArray = [];
  temperaments.split(", ").forEach((i) => temperamentsArray.push(i));
  return temperamentsArray;
};

module.exports = {
  getAllApiConvertWeight,
  getAllDbConvertWeight,
  convertTemperamentsToArray,
};
