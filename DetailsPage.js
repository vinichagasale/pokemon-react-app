import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export function DetailsPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then(setPokemon);
  }, [name]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500">← Voltar</Link>
      <h1 className="text-3xl font-bold capitalize mt-2">{pokemon.name}</h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-48 mt-4" />

      <ul className="mt-6 space-y-2">
        <li><strong>Altura:</strong> {pokemon.height}</li>
        <li><strong>Peso:</strong> {pokemon.weight}</li>
        <li><strong>Experiência Base:</strong> {pokemon.base_experience}</li>
        <li><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</li>
        <li><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</li>
        <li><strong>Movimentos:</strong> {pokemon.moves.slice(0, 5).map(m => m.move.name).join(", ")}</li>
      </ul>
    </div>
  );
}
