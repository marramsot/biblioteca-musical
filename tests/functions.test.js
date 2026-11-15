// Importamos la función que queremos probar.
const { sumArray, countWords, findMax, isDivisible } = require("../functions");
//sumArray
// Comprobamos que la función sume números positivos.
test("suma correctamente un arreglo de números positivos", () => {
  expect(sumArray([1, 2, 3, 4])).toBe(10);
});
// Comprobamos que la función sume números negativos.
test("suma correctamente un arreglo de números negativos", () => {
  expect(sumArray([-5, -10, -3, -8])).toBe(-26);
});
// Comprobamos que un arreglo vacío devuelva 0.
test("Este es un arreglo vacío, devuelve 0", () => {
  expect(sumArray([])).toBe(0);
});
// prueba con un arreglo que incluya 0.
test("Este arreglo incluye un 0, y hace una suma", () => {
  expect(sumArray([0, 3, 2])).toBe(5);
});

//countWords
//Prueba con una cadena de texto normal
test("retorna la cantidad de palabras", () =>{
expect(countWords("Hola mundo esto es una prueba")).toBe(6);
});
//Prueba con una cadena con espacios al inicio y final.
test("ignora espacios al principio y al final", () =>{
expect(countWords("  Hola mundo esto es una prueba  ")).toBe(6);
});
//Prueba con una cadena vacía (debe retornar 0).
test("texto vacio retorna 0", () =>{
expect(countWords("")).toBe(0);
});

//Prueba con una cadena con espacios consecutivos entre palabras.
test("ignorar espacios consecutivos", () =>{
expect(countWords("Hola    mundo    esto    es    una   prueba")).toBe(6);
});

//findMax
//Prueba con un arreglo de números positivos.
test("Recibe números positivos y retorna el mayor", () => {
  expect(findMax([5, 2, 9, 3])).toBe(9);
});
//Prueba con un arreglo de números negativos.
test("Recibe números negativos y retorna el mayor", () => {
  expect(findMax([-5, -2, -9, -3])).toBe(-2);
});
//Prueba con un arreglo vacío (debe retornar null).
test("Recibe un areglo vacío y retorna  null", () => {
  expect(findMax([])).toBe(null);
});
//Prueba con un arreglo donde todos los números son iguales.
test("Recibe números iguales y retorna el número", () => {
  expect(findMax([3,3,3,3])).toBe(3);
});

//isDivisible
//Prueba con números divisibles.
test("Retorna true cuando el número es divisible", () => {
  expect(isDivisible(10, 2)).toBe(true);
});

//Prueba con números no divisibles.
test("Retorna false cuando el número no es divisible", () => {
  expect(isDivisible(10, 3)).toBe(false);
});
//Prueba con el divisor siendo 0 (debe retornar un mensaje de error).
test("Retorna un mensaje cuando el divisor es cero", () => {
  expect(isDivisible(10, 0)).toBe("No se puede dividir entre cero");
});
//Prueba con números negativos como entrada.
test("Comprueba la divisibilidad con números negativos", () => {
  expect(isDivisible(-10, 2)).toBe(true);
});