import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/pages/NotFound";

import GithubState from "./context/Github/GithubState";
import UserRepoList from "./components/users/UserRepoList";
import Provider from "./context/Provider";
import "./App.css";

function App() {
  return (
    <Provider>
      {" "}
      <Router>
        <Link to="/">
          <Navbar title="Github User Searching App" />
        </Link>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/user/:login" element={<UserRepoList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
