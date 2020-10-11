import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Space from "./space";
import Time from "./time";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Home() {
  return (
    <>
      <Header />

      <Router>
        <Link to="/">Space</Link> || <Link to="/time">Time</Link>

        <Switch>
          <Route path="/Time">
            <Time />
          </Route>
          <Route path="/">
            <Space />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default Home;
