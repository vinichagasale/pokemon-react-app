import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.name === pokemon.name);
      if (exists) {
        return prev.filter((p) => p.name !== pokemon.name);
      } else {
        return [...prev, pokemon];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
