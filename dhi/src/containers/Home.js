import React from 'react';
import './Home.css';
// import ReactDOM from 'react-dom';
import {Container, Box, Button} from '@material-ui/core';
// import {}  from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Space() {
  return <h2>Space</h2>;
}

function Time() {
  return <h2>Time</h2>;
}

// function Users() {
//   return <h2>Users</h2>;
// }


function Home() {
  return (
    <Container maxWidth="lg">
    {/* // <div className="App"> */}
      <header className="App-header">
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Box color="text.primary" clone>
        <Button />
        </Box>
          
      </header>




      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Space</Link>
            </li>
            <li>
              <Link to="/time">Time</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/time">
            <Time />
          </Route>
          <Route path="/">
            <Space />
          </Route>
        </Switch>
      </div>
    </Router>
    
    </Container>
  );
}

export default Home;
