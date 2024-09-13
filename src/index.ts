import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import pokemonRoutes from "./routes/pokemonRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/pokemons", pokemonRoutes); // http://localhost:8000/pokemons

/* SERVER */
const port = Number(process.env.PORT) || 8000;
const environment = process.env.NODE_ENV;
app.listen(port, "0.0.0.0", () => {
  console.log(`Environment: ${environment}`);
  console.log(`Server running on port ${port}`);
});
