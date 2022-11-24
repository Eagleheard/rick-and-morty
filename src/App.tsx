import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Character, Episode, Home, Location } from "screen";
import { AuthProvider } from "hooks/useAuth";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:characterId" element={<Character />} />
          <Route path="/episode/:episodeId" element={<Episode />} />
          <Route path="/location/:locationId" element={<Location />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
