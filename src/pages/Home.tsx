import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPokemonList, getPokemon, getPokemonByType, getAllPokemonTypes } from '../api/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { Pokemon, PokemonListResponse } from '../types/pokemon';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [types, setTypes] = useState<string[]>([]);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '0'));
  const [pageInput, setPageInput] = useState((page + 1).toString());
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'id-asc');
  const ITEMS_PER_PAGE = 10;

  // Use React Query for caching
  const { data: typesData } = useQuery({
    queryKey: ['pokemon-types'],
    queryFn: getAllPokemonTypes,
  });

  const { data: allPokemonData, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['all-pokemon'],
    queryFn: async () => {
      const initialData: PokemonListResponse = await getPokemonList(0, 1000);
      return Promise.all(initialData.results.map((p) => getPokemon(p.name)));
    },
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedType) params.set('type', selectedType);
    if (page > 0) params.set('page', page.toString());
    if (sortOrder !== 'id-asc') params.set('sort', sortOrder);
    setSearchParams(params);
  }, [searchQuery, selectedType, page, sortOrder, setSearchParams]);

  useEffect(() => {
    if (typesData) {
      setTypes(typesData.map((type: { name: string }) => type.name));
    }
  }, [typesData]);

  useEffect(() => {
    if (allPokemonData) {
      setAllPokemon(allPokemonData);
    }
  }, [allPokemonData]);

  useEffect(() => {
    setPageInput((page + 1).toString());
  }, [page]);

  useEffect(() => {
    const filterAndPaginatePokemon = async () => {
      try {
        let filteredPokemon = [...allPokemon];

        // Apply type filter
        if (selectedType) {
          const typeData = await getPokemonByType(selectedType);
          const pokemonNames = new Set(typeData.pokemon.map((p) => p.pokemon.name));
          filteredPokemon = filteredPokemon.filter((p) => pokemonNames.has(p.name));
        }

        // Apply search filter
        if (searchQuery) {
          filteredPokemon = filteredPokemon.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply sorting
        filteredPokemon.sort((a, b) => {
          switch (sortOrder) {
            case 'id-asc':
              return a.id - b.id;
            case 'id-desc':
              return b.id - a.id;
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });

        setTotalPages(Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE));
        setPokemon(filteredPokemon.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error filtering pokemon:', error);
      }
    };

    if (allPokemon.length > 0) {
      filterAndPaginatePokemon();
    }
  }, [page, selectedType, searchQuery, sortOrder, allPokemon]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPage = Math.max(0, Math.min(parseInt(pageInput) - 1, totalPages - 1));
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">Pokédex</h1>
          <p className="text-lg text-gray-600">Discover and explore the world of Pokémon</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={(value) => {
              setSearchQuery(value);
              setPage(0);
            }} />
          </div>
          <div className="flex gap-4">
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onChange={(type) => {
                setSelectedType(type);
                setPage(0);
              }}
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOption)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition-all"
            >
              <option value="id-asc">ID (Low to High)</option>
              <option value="id-desc">ID (High to Low)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {isLoadingPokemon ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-500" />
          </div>
        ) : (
          <>
            {pokemon.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No Pokémon found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemon.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} />
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
                <span className="text-gray-600">Page</span>
                <input
                  type="text"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Page number"
                />
                <span className="text-gray-600">of {totalPages}</span>
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Go
                </button>
              </form>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}