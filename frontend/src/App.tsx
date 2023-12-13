import { Link, HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Band from "./views/Band";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/band">Band List</Link>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/band" element={<Band />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
