import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DetailsPage } from "./pages/DetailsPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ApiProvider } from "./services/ApiContext";

export default function App() {
  return (
    <ApiProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:name" element={<DetailsPage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </ApiProvider>
  );
}
