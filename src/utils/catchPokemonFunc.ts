// Function to catch Pokemon with 50% probability
export const catchPokemonFunc = (): boolean => {
  const randomNum = Math.random(); // Generate a random number between 0 and 1
  return randomNum < 0.5; // If less than 0.5, successful catch
};
