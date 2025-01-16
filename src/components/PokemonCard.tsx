import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400 hover:bg-gray-500',
  fire: 'bg-red-500 hover:bg-red-600',
  water: 'bg-blue-500 hover:bg-blue-600',
  electric: 'bg-yellow-400 hover:bg-yellow-500',
  grass: 'bg-green-500 hover:bg-green-600',
  ice: 'bg-blue-200 hover:bg-blue-300',
  fighting: 'bg-red-700 hover:bg-red-800',
  poison: 'bg-purple-500 hover:bg-purple-600',
  ground: 'bg-yellow-600 hover:bg-yellow-700',
  flying: 'bg-indigo-400 hover:bg-indigo-500',
  psychic: 'bg-pink-500 hover:bg-pink-600',
  bug: 'bg-lime-500 hover:bg-lime-600',
  rock: 'bg-yellow-800 hover:bg-yellow-900',
  ghost: 'bg-purple-700 hover:bg-purple-800',
  dragon: 'bg-indigo-700 hover:bg-indigo-800',
  dark: 'bg-gray-800 hover:bg-gray-900',
  steel: 'bg-gray-500 hover:bg-gray-600',
  fairy: 'bg-pink-300 hover:bg-pink-400',
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const location = useLocation();

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      state={{ from: location.pathname + location.search }}
      className="bg-white rounded-xl shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative pb-[100%] mb-4 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="absolute inset-0 w-full h-full object-contain p-2"
        />
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm font-medium">
          #{String(pokemon.id).padStart(3, '0')}
        </p>
        <h2 className="text-xl font-bold capitalize mb-3 text-gray-800">
          {pokemon.name}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${typeColors[type.name]} text-white px-3 py-1 rounded-full text-sm capitalize transition-colors`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}