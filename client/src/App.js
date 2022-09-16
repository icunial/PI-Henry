import Home from "./components/home/Home";

import DogDetail from "./components/dogdetail/DogDetail";
import Form from "./components/form/Form";
import Landpage from "./components/landpage/Landpage";

import "./App.css";
import { Route } from "react-router-dom";

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
    </div>
  );
}

export default App;
