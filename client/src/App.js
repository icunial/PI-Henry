import "./App.css";
import { Route } from "react-router-dom";

import Home from "./components/home/Home";
import DogDetail from "./components/dogdetail/DogDetail";
import Form from "./components/form/Form";
import Landpage from "./components/landpage/Landpage";
import Favourites from "./components/favourites/Favourites";

function App() {
  return (
    <div className="appContainer">
      <Route path="/" exact component={Landpage} />
      <Route path="/home" exact component={Home} />
      <Route
        exact
        path="/dogs/:id"
        render={({ match }) => <DogDetail match={match} />}
      />
      <Route path="/form" exact component={Form} />
      <Route path="/favourites" exact component={Favourites} />
    </div>
  );
}

export default App;
