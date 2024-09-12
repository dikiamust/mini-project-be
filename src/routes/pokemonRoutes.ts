import { Router } from "express";
import {
  catchPokemon,
  releasePokemon,
  renamePokemon,
} from "../controllers/pokemonController";

const router = Router();

router.get("/catch/:pokemonId", catchPokemon);
router.get("/release/:pokemonId", releasePokemon);
router.get("/rename/:pokemonId", renamePokemon);

export default router;
