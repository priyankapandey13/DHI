import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import CarouselShow from "./CarouselShow";
import { Container, Box, Grid } from "@material-ui/core";
// import PropTypes from "prop-types";
// import Box from "@material-ui/core/Box";
import Space from "./space";
import Time from "./time";

function Home() {
  return (
    <>
      <Header />
      <CarouselShow />
      <Box
        maxWidth="xl"
        className="contentcontainer MuiPaper-elevation10"
        elevation={5}
      >
        <Container maxWidth="xl" className="">
          <h2>Welcome To DHI</h2>

          <Grid container direction="row">
            <Grid item lg={3}>
              <h3>Explore the power of data </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                </p>
                <p>
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
            </Grid>
            <Grid item lg={1}></Grid>
            <Grid item lg={8}>
              <Router>
                <div className="routerlinks">
                  <Link to="/">Space</Link>
                  <Link to="/time">Time</Link>
                </div>
                <div className="routercontainer">
                <Switch>
                  <Route path="/Time">
                    <Time />
                  </Route>
                  <Route path="/">
                    <Space />
                  </Route>
                </Switch>
                </div>
              </Router>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Home;
