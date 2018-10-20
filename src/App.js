import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import NavBar from "./NavBar";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <ReduxProvider store={store}>
          <Router>
            <Results path="/" />
            <Details Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </ReduxProvider>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
