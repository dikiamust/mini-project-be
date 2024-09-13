import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  catchPokemonFunc,
  getPokemonData,
  isPrimeNumFunc,
  fibonacciFunc,
} from "../utils";

const prisma = new PrismaClient();

export const myPokemons = async (req: Request, res: Response) => {
  try {
    const pokemon = await prisma.pokemon.findMany();

    res.status(200).json({
      success: true,
      message: "My Pokémons successfully retrieved",
      data: pokemon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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
