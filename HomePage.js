import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../services/ApiContext";
import { FavoritesContext } from "../contexts/FavoritesContext";

export function HomePage() {
  const { getPokemonList } = useContext(ApiContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    getPokemonList(page * limit, limit).then(setPokemons);
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémons</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pokemons.map((p) => (
          <div key={p.name} className="border rounded p-2 text-center">
            <Link to={`/pokemon/${p.name}`} className="block">
              <img src={p.image} alt={p.name} className="w-20 mx-auto" />
              <p className="capitalize font-semibold mt-2">{p.name}</p>
            </Link>
            <button
              onClick={() => toggleFavorite(p)}
              className="mt-2 text-sm text-blue-500"
            >
              {favorites.find((f) => f.name === p.name)
                ? "★ Favorito"
                : "☆ Marcar como favorito"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          Página anterior
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Próxima página</button>
      </div>
    </div>
  );
}
