//import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import Home from "./assets/Home";
import Header from "./assets/Header";
import Characters from "./assets/Characters";
import Character from "./assets/Character";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header> </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/character/:id"
            element={<Character></Character>}
          ></Route>
          <Route path="/characters" element={<Characters></Characters>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
