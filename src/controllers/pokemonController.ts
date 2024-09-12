import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to catch Pokemon with 50% probability
const catchPokemonFunc = (): boolean => {
  const randomNum = Math.random(); // Generate a random number between 0 and 1
  return randomNum < 0.5; // If less than 0.5, successful catch
};

// Function to retrieve Pokemon data from PokeAPI
const getPokemonData = async (pokemonId: number) => {
  const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  try {
    const response = await axios.get(pokeApiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve Pokémon data");
  }
};

export const catchPokemon = async (req: Request, res: Response) => {
  const pokemonId = parseInt(req.params.pokemonId);

  // Catch Pokemon with 50% probability
  const isCaught = catchPokemonFunc();

  if (!isCaught) {
    return res.status(400).json({
      success: false,
      message: "Pokémon failed to catch",
    });
  }

  try {
    // If successful, retrieve Pokemon data from PokeAPI
    const pokemonData = await getPokemonData(pokemonId);

    const pokemon = await prisma.pokemon.create({
      data: {
        id: pokemonData.id,
        name: pokemonData.name,
        nickname: `${pokemonData.name}-0`,
        types: pokemonData.types.map((typeInfo: any) => typeInfo.type.name),
        moves: pokemonData.moves.map((moveInfo: any) => moveInfo.move.name),
        image: pokemonData.sprites.front_default,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pokémon successfully caught",
      data: pokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve Pokémon data after caught",
    });
  }
};

// Function to check whether a number is prime
const isPrimeNumFunc = (num: number): boolean => {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const releasePokemon = async (req: Request, res: Response) => {
  const pokemonId = parseInt(req.params.pokemonId);

  // Generate random numbers between 1 and 100
  const randomNum = Math.floor(Math.random() * 100) + 1;

  // Check whether the number is a prime number
  const isPrimeNumber = isPrimeNumFunc(randomNum);

  if (isPrimeNumber) {
    // Release pokemon
    await prisma.pokemon.delete({ where: { id: pokemonId } });
    res.status(200).json({
      success: true,
      message: `Pokémon with ID ${pokemonId} successfully released!`,
      primeNumber: randomNum,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `Pokémon with ID ${pokemonId} failed to release. The number ${randomNum} is not a prime number`,
      primeNumber: randomNum,
    });
  }
};

// Function to calculate Fibonacci values
const fibonacciFunc = (n: number): number => {
  if (n <= 1) return n;
  return fibonacciFunc(n - 1) + fibonacciFunc(n - 2);
};

export const renamePokemon = async (req: Request, res: Response) => {
  try {
    const pokemonId = parseInt(req.params.pokemonId);
    const { newName } = req.body;

    if (!newName) {
      return res.status(400).json({
        success: false,
        message: "You must provide a new name",
      });
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        message: "Pokemon not found",
      });
    }

    // Calculate Fibonacci values ​​based on the number of renames (renameCount)
    const fibonacciValue = fibonacciFunc(pokemon.renameCount);

    // Rename the Pokémon with the new name + Fibonacci value
    const renamedPokemon = `${newName}-${fibonacciValue}`;

    // Update the Pokémon name and add 1 to renameCount
    await prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        nickname: renamedPokemon,
        renameCount: pokemon.renameCount + 1,
      },
    });

    res.status(200).json({
      success: true,
      message: `Pokémon with ID ${pokemonId} renamed successfully!`,
      renamedPokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to rename pokemon`,
    });
  }
};
