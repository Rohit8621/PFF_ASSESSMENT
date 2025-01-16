import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemon, getPokemonByType } from '../api/pokemon';
import { Pokemon } from '../types/pokemon';
import { ArrowLeft, Loader2 } from 'lucide-react';

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const backTo = location.state?.from || '/home';

  const { data: pokemon, isLoading: isPokemonLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id!),
  });

  const { data: similarPokemon = [], isLoading: isSimilarLoading } = useQuery({
    queryKey: ['similar-pokemon', id],
    queryFn: async () => {
      if (!pokemon) return [];
      
      const similarPokemonPromises = await Promise.all(
        pokemon.types.map(async ({ type }) => {
          const typeData = await getPokemonByType(type.name);
          return typeData.pokemon
            .filter((p) => p.pokemon.name !== pokemon.name)
            .slice(0, 5)
            .map((p) => getPokemon(p.pokemon.name));
        })
      );

      const allSimilarPokemon = await Promise.all(similarPokemonPromises.flat());
      return Array.from(
        new Map(allSimilarPokemon.map((p) => [p.id, p])).values()
      ).slice(0, 5);
    },
    enabled: !!pokemon,
  });

  if (isPokemonLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-600 mb-4">Pokemon not found</p>
        <Link
          to="/home"
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Pokédex
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to={backTo}
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Pokédex
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full h-auto"
              />
            </div>

            <div>
              <div className="mb-6">
                <p className="text-gray-500 text-lg">
                  #{String(pokemon.id).padStart(3, '0')}
                </p>
                <h1 className="text-4xl font-bold capitalize mb-4">
                  {pokemon.name}
                </h1>
                <div className="flex gap-2">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className={`${
                        typeColors[type.name]
                      } text-white px-4 py-1 rounded-full text-sm capitalize`}
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-gray-500">Height</p>
                  <p className="text-xl font-semibold">{pokemon.height / 10}m</p>
                </div>
                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="text-xl font-semibold">
                    {pokemon.weight / 10}kg
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map(({ stat, base_stat }) => (
                    <div key={stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">
                          {statNames[stat.name]}
                        </span>
                        <span>{base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Similar Pokémon</h2>
          {isSimilarLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {similarPokemon.map((p) => (
                <Link
                  key={p.id}
                  to={`/pokemon/${p.id}`}
                  state={{ from: backTo }}
                  className="bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105"
                >
                  <img
                    src={p.sprites.other['official-artwork'].front_default}
                    alt={p.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">
                      #{String(p.id).padStart(3, '0')}
                    </p>
                    <h3 className="font-bold capitalize mb-2">{p.name}</h3>
                    <div className="flex gap-1 justify-center">
                      {p.types.map(({ type }) => (
                        <span
                          key={type.name}
                          className={`${
                            typeColors[type.name]
                          } text-white px-2 py-0.5 rounded-full text-xs capitalize`}
                        >
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}