/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  id: "5a103f6d-c337-47dd-9572-53b65503bf45",
  name: "Pug",
  min_height: 1,
  max_height: 2,
  height: "1 - 2",
  min_weight: 1,
  max_weight: 2,
  weight: "1 - 2",
  min_life_span: 1,
  max_life_span: 2,
  life_span: "1 - 2",
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200 -> /dogs", () => agent.get("/dogs").expect(200));
    it("should get 200 -> /dogs?from=api", () =>
      agent.get("/dogs?from=api").expect(200));
    it("should get 200 -> /dogs?from=db", () =>
      agent.get("/dogs?from=db").expect(200));
    it("should get 200 -> /dogs?temperament=Sociable", () =>
      agent.get("/dogs?temperament=Sociable").expect(200));
    it("should get 404 -> /dogs?temperament=Malhumorado", () =>
      agent.get("/dogs?temperament=Malhumorado").expect(404));
    it("should get 200 -> /dogs?name=bel", () =>
      agent.get("/dogs?name=bel").expect(200));
    it("should get 404 -> /dogs?name=aaaaaa", () =>
      agent.get("/dogs?name=aaaaa").expect(404));
    it("should get 200 -> /dogs/filter/az", () => agent.get("/dogs/filter/az"));
    it("should get 200 -> /dogs/filter/za", () => agent.get("/dogs/filter/za"));
    it("should get 200 -> /dogs/filter/more", () =>
      agent.get("/dogs/filter/more"));
    it("should get 200 -> /dogs/filter/less", () => {
      agent.get("/dogs/filter/less");
    });
  });
});
