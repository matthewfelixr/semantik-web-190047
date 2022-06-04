import React, {} from "react";
import "./App.css";
// import "./styles/main_styles.css";
// import "./styles/responsive.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/home";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route  path="/" exact element={<Home/>}></Route>
        {/* <Route exact path="/advanced" component={Advanced}></Route>
        <Route exact path="/about" component={About}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;