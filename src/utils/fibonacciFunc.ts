// Function to calculate Fibonacci values
export const fibonacciFunc = (n: number): number => {
  if (n <= 1) return n;
  return fibonacciFunc(n - 1) + fibonacciFunc(n - 2);
};
