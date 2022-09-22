import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import DogDetail from "./components/dogdetail/DogDetail";
import Form from "./components/form/Form";
import Landpage from "./components/landpage/Landpage";
import Home from "./components/home/Home";
import Favourites from "./components/favourites/Favourites";

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/index";

configure({ adapter: new Adapter() });

const componentToUse = (route) => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("<App />", () => {
  const routes = ["/", "/home", "/dogs/1", "/form", "/favourites"];

  describe("LandPage", () => {
    it("Must be rendered on route '/'", () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Landpage)).toHaveLength(1);
    });
  });
  describe("Home", () => {
    it("Must be rendered on route '/home'", () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Home)).toHaveLength(1);
    });
    it("It does not be rendered in another route", () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Home)).toHaveLength(1);
      const app2 = mount(componentToUse(routes[0]));
      expect(app2.find(Home)).toHaveLength(0);
      const app3 = mount(componentToUse(routes[2]));
      expect(app3.find(Home)).toHaveLength(0);
    });
  });
  describe("DogDetail", () => {
    it("The route '/dogs/:id' should show only DogDetail component", () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(DogDetail)).toHaveLength(1);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(Landpage)).toHaveLength(0);
    });
  });
  describe("Form", () => {
    it("Must be rendered on route '/form'", () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(Form)).toHaveLength(1);
    });
    it("It does not be rendered in another route", () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(Form)).toHaveLength(1);
      const app2 = mount(componentToUse(routes[0]));
      expect(app2.find(Form)).toHaveLength(0);
      const app3 = mount(componentToUse(routes[1]));
      expect(app3.find(Form)).toHaveLength(0);
      const app4 = mount(componentToUse(routes[2]));
      expect(app4.find(Form)).toHaveLength(0);
      const app5 = mount(componentToUse(routes[4]));
      expect(app5.find(Form)).toHaveLength(0);
    });
  });
  describe("Favourites", () => {
    it("Must be rendered on route '/favourites'", () => {
      const app = mount(componentToUse(routes[4]));
      expect(app.find(Favourites)).toHaveLength(1);
    });
    it("It does not be rendered in another route", () => {
      const app = mount(componentToUse(routes[4]));
      expect(app.find(Favourites)).toHaveLength(1);
      const app2 = mount(componentToUse(routes[0]));
      expect(app2.find(Favourites)).toHaveLength(0);
      const app3 = mount(componentToUse(routes[1]));
      expect(app3.find(Favourites)).toHaveLength(0);
      const app4 = mount(componentToUse(routes[2]));
      expect(app4.find(Favourites)).toHaveLength(0);
      const app5 = mount(componentToUse(routes[3]));
      expect(app5.find(Favourites)).toHaveLength(0);
    });
  });
});
