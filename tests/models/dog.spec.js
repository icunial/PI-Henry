const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });
    });
    describe("min_height", () => {
      it("should throw an error if min height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid min height")))
          .catch(() => done());
      });
      it("should work when its a valid min height", () => {
        Dog.create({ min_height: 1 });
      });
    });
    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when its a valid height", () => {
        Dog.create({ height: "1 - 2" });
      });
    });
    describe("min_weight", () => {
      it("should throw an error if min weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid min weight")))
          .catch(() => done());
      });
      it("should work when its a valid min weight", () => {
        Dog.create({ min_weight: 1 });
      });
    });
    describe("weight", () => {
      it("should throw an error if weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid weight")))
          .catch(() => done());
      });
      it("should work when its a valid weight", () => {
        Dog.create({ weight: "1 - 2" });
      });
    });
    describe("min_life_span", () => {
      it("should throw an error if min life span is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid min life span")))
          .catch(() => done());
      });
      it("should work when its a valid min life span", () => {
        Dog.create({ min_life_span: 1 });
      });
    });
    describe("life span", () => {
      it("should throw an error if life span is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid life span")))
          .catch(() => done());
      });
      it("should work when its a valid life span", () => {
        Dog.create({ life_span: "1 - 2" });
      });
    });
  });
});
