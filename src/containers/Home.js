import React, { useState } from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import CarouselShow from "./CarouselShow";
import { Container, Box } from "@material-ui/core";
import Space from "./space";
import Time from "./time";

export const GlobalStateContextLati = React.createContext(0);
export const GlobalStateContextLongi = React.createContext(0);

function Home() {
  const [CurrentGraphInputLati, SetCurrentGraphInputLati] = useState(0);
  const [CurrentGraphInputLongi, SetCurrentGraphInputLongi] = useState(0);

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
          <Box>
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
          </Box>
          <Box>
            <GlobalStateContextLati.Provider
              value={[CurrentGraphInputLati, SetCurrentGraphInputLati]}
            >
              <GlobalStateContextLongi.Provider
                value={[CurrentGraphInputLongi, SetCurrentGraphInputLongi]}
              >
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
              </GlobalStateContextLongi.Provider>
            </GlobalStateContextLati.Provider>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Home;
