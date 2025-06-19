import React, { createContext } from "react";

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  const getPokemonList = async (offset = 0, limit = 20) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    const detailed = await Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        const json = await res.json();
        return {
          name: p.name,
          image: json.sprites.front_default,
        };
      })
    );
    return detailed;
  };

  return (
    <ApiContext.Provider value={{ getPokemonList }}>
      {children}
    </ApiContext.Provider>
  );
}
