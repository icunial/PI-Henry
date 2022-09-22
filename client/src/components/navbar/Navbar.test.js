import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow, mount } from "enzyme";
import isReact from "is-react";
import Navbar from "./Navbar.jsx";
import { Provider } from "react-redux";
import store from "../../store/index";
import { MemoryRouter } from "react-router-dom";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
  };

  it('Must render three <Link to=""/>/ First to /home, Second to -> /form, Third to -> /favourites', () => {
    const app = mount(componentToUse());
    expect(app.find(Link).length).toBeGreaterThanOrEqual(3);
    expect(app.find(Link).find({ to: "/home" }).length).toBe(1);
    expect(app.find(Link).find({ to: "/form" }).length).toBe(1);
    expect(app.find(Link).find({ to: "/favourites" }).length).toBe(1);
  });

  it("Must have a Link with the text 'Home' that changes the route to '/home'", () => {
    const app = mount(componentToUse());
    expect(app.find(Link).find({ to: "/home" }).text()).toBe("Home");
  });

  it("Must have a Link with the text 'Create New Dog' that changes the route to '/home'", () => {
    const app = mount(componentToUse());
    expect(app.find(Link).find({ to: "/form" }).text()).toBe("Create New Dog");
  });

  it("Must have a Link with the text 'My Favourites' that changes the route to '/favourites'", () => {
    const app = mount(componentToUse());
    expect(app.find(Link).find({ to: "/favourites" }).text()).toBe(
      "My Favourites"
    );
  });
});
