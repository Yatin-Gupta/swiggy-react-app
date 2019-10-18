import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AppConfig from "./config/AppConfig";

function App() {
  const { ROUTES } = AppConfig;
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Route path={ROUTES.root.path} component={ROUTES.root.component} />
      </Router>
    </React.Fragment>
  );
}

export default App;
