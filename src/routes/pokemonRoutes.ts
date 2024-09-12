import { Router } from "express";
import {
  myPokemons,
  catchPokemon,
  releasePokemon,
  renamePokemon,
} from "../controllers/pokemonController";

const router = Router();

router.get("/mine", myPokemons);
router.post("/catch/:pokemonId", catchPokemon);
router.put("/release/:pokemonId", releasePokemon);
router.put("/rename/:pokemonId", renamePokemon);

export default router;
