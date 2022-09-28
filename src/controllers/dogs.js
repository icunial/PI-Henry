const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const utils = require("../utils/index");

const findDogByIdApi = async (id) => {
  const result = [];

  try {
    const apiResults = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    if (apiResults) {
      apiResults.data.forEach((r) => {
        if (r.id === parseInt(id)) {
          result.push({
            id: r.id,
            name: r.name,
            image: r.image.url,
            temperament: r.temperament
              ? utils.convertTemperamentsToArray(r.temperament)
              : [],
            weight:
              r.weight.metric.substring(0, 3) === "NaN"
                ? "No Specified"
                : r.weight.metric,
            height: r.height.metric,
            life_span: r.life_span,
          });
        }
      });
    }

    return result;
  } catch (error) {
    throw new Error("Error finding a dog by its ID in API");
  }
};

const findDogByIdDb = async (id) => {
  try {
    const dbResults = await Dog.findByPk(id, {
      attributes: ["id", "name", "image", "weight", "height", "life_span"],
      include: Temperament,
    });

    const result = [
      {
        id: dbResults.id,
        name: dbResults.name,
        image: dbResults.image,
        temperament: dbResults.temperaments.map((t) => t.name),
        weight: dbResults.weight,
        height: dbResults.height,
        life_span: dbResults.life_span,
      },
    ];

    return result;
  } catch (error) {
    throw new Error("Error finding a dog by its ID in DB");
  }
};

const findByNameApi = async (name) => {
  const results = [];
  try {
    const apiResults = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg`,
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "No Specified"
              : r.weight.metric,
        });
      });
    }

    return results;
  } catch (error) {
    throw new Error("Error trying to get a dog by its name from API");
  }
};

const findByNameDb = async (name) => {
  const results = [];
  try {
    const dbResults = await Dog.findAll({
      attributes: ["id", "name", "image", "weight"],
      include: Temperament,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        temperament: r.temperaments.map((t) => t.name),
        weight: r.weight,
      });
    });

    return results;
  } catch (error) {
    throw new Error("Error trying to get a dog by its name from DB");
  }
};

const findByTemperamentApi = async (temp) => {
  let results = [];
  try {
    const apiResults = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: r.image.url,
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "No Specified"
              : r.weight.metric,
        });
      });
    }

    results = results.filter((r) => {
      return r.temperament.includes(temp);
    });

    return results;
  } catch (error) {
    throw new Error(
      "Error trying to get all dogs by their temperament from API"
    );
  }
};

const findByTemperamentDb = async (temp) => {
  let results = [];
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
        weight: r.weight,
      });
    });

    results = results.filter((r) => {
      return r.temperament.includes(temp);
    });

    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from DB");
  }
};

const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: r.image.url,
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "No Specified"
              : r.weight.metric,
        });
      });
    }

    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from API");
  }
};

const getAllDb = async () => {
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
        weight: r.weight,
      });
    });

    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from DB");
  }
};

const orderDogsFromAtoZ = async () => {
  try {
    let dogsFromApi = await getAllApi();
    let dogsFromDb = await getAllDb();

    let results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order from A to Z");
  }
};

const orderDogsFromZtoA = async () => {
  try {
    let dogsFromApi = await getAllApi();
    let dogsFromDb = await getAllDb();

    let results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order from A to Z");
  }
};

const orderDogsMoreWeight = async () => {
  try {
    let dogsFromApi = await utils.getAllApiConvertWeight();
    let dogsFromDb = await utils.getAllDbConvertWeight();

    let results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      if (a.min_weight < b.min_weight) return 1;
      if (a.min_weight > b.min_weight) return -1;
      if (a.min_weight === b.min_weight) {
        if (a.max_weight < b.max_weight) return 1;
        if (a.max_weight > b.max_weight) return -1;
      }
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order from More Weight to Less");
  }
};

const orderDogsLessWeight = async () => {
  try {
    const dogsFromApi = await utils.getAllApiConvertWeight();
    const dogsFromDb = await utils.getAllDbConvertWeight();

    const results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      if (a.min_weight > b.min_weight) return 1;
      if (a.min_weight < b.min_weight) return -1;

      if (a.min_weight === b.min_weight) {
        if (a.max_weight > b.max_weight) return 1;
        if (b.max_weight === null) return -1;
        if (a.max_weight < b.max_weight) return -1;
      }
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order from More Weight to Less");
  }
};

const deleteDogFromDbById = async (id) => {
  try {
    const dogDeleted = await Dog.destroy({
      where: {
        id,
      },
    });
    return dogDeleted;
  } catch (error) {
    throw new Error("Error deleting a dog by its ID in DB");
  }
};

const updateDogFromDb = async (id, name) => {
  try {
    const dogUpdated = await Dog.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    return dogUpdated;
  } catch (error) {
    throw new Error("Error updating a dog!");
  }
};

module.exports = {
  findByNameApi,
  findByNameDb,
  getAllApi,
  getAllDb,
  findDogByIdApi,
  findDogByIdDb,
  orderDogsFromAtoZ,
  orderDogsFromZtoA,
  orderDogsMoreWeight,
  orderDogsLessWeight,
  deleteDogFromDbById,
  findByTemperamentApi,
  findByTemperamentDb,
  updateDogFromDb,
};
