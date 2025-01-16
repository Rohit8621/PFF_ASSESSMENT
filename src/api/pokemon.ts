const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(offset = 0, limit = 10) {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data;
}

export async function getPokemon(id: string | number) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
}

export async function getPokemonByType(type: string) {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  return data;
}

export async function getAllPokemonTypes() {
  const response = await fetch(`${BASE_URL}/type`);
  const data = await response.json();
  return data.results;
}