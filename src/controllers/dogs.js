const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const convertTemperamentsToArray = (temperaments) => {
  const temperamentsArray = [];
  temperaments.split(", ").forEach((i) => temperamentsArray.push(i));
  return temperamentsArray;
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
            ? convertTemperamentsToArray(r.temperament)
            : [],
          weight: r.weight.metric,
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
            ? convertTemperamentsToArray(r.temperament)
            : [],
          weight: r.weight.metric,
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
              ? convertTemperamentsToArray(r.temperament)
              : [],
            weight: r.weight.metric,
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

const orderDogsMoreWeight = async () => {
  try {
    let dogsFromApi = await getAllApiConvertWeight();
    let dogsFromDb = await getAllDbConvertWeight();

    let results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      if (a.weightConvert <= b.weightConvert) return 1;
      if (a.weightConvert > b.weightConvert) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error("Error trying to order from More Weight to Less");
  }
};

const orderDogsLessWeight = async () => {
  try {
    const dogsFromApi = await getAllApiConvertWeight();
    const dogsFromDb = await getAllDbConvertWeight();

    const results = [...dogsFromApi, ...dogsFromDb];

    return results.sort((a, b) => {
      return a.weightConvert - b.weightConvert;
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
};
