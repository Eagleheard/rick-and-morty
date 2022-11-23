import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Header } from "./components";
import { Character, Home } from "screen";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
