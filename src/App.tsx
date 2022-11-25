import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Character, Episode, Home, Location, Profile } from "screen";
import { AuthProvider } from "hooks/useAuth";
import { ToastProvider } from "hooks/useToast";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:characterId" element={<Character />} />
            <Route path="/episode/:episodeId" element={<Episode />} />
            <Route path="/location/:locationId" element={<Location />} />
            <Route path="/profile/:userEmail" element={<Profile />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
