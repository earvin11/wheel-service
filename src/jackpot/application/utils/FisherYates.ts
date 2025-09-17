/*
Documentación del Algoritmo Fisher-Yates
El Fisher-Yates shuffle (también conocido como Knuth shuffle) es un algoritmo eficiente y correcto para generar permutaciones aleatorias uniformes. 
Fue diseñado originalmente por Ronald Fisher y Frank Yates en 1938, y posteriormente optimizado por Donald Knuth en la era informática.

Características clave:
Complejidad: O(n) en tiempo (óptimo para mezclado)
Uniformidad: Genera todas las permutaciones posibles con igual probabilidad (1/n!)
In-place: Opera directamente sobre la estructura (versión mutable)
Estabilidad: No afecta elementos idénticos de manera especial
*/

// Versión MUTABLE
export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambio
  }
  return array;
};

// Versión INMUTABLE (devuelve nuevo array)
export const shuffleArrayCopy = <T>(array: readonly T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
