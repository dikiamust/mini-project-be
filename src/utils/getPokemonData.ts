import axios from "axios";

export const getPokemonData = async (pokemonId: number) => {
  const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
    const response = await axios.get(pokeApiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve Pokémon data");
  }
};
