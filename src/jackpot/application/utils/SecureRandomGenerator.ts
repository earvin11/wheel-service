// Importa la función randomBytes del módulo crypto de Node.js

/*
const buffer = randomBytes(count * 4);
Genera un buffer (array de bytes) con una longitud de count * 4 bytes
Por qué 4 bytes? Cada número aleatorio requiere 32 bits (4 bytes) para máxima precisión
Ejemplo: Si count = 3 → Genera 12 bytes aleatorios (3 números * 4 bytes)

Array.from({ length: count }, ...)
Crea un nuevo array con longitud igual a count (cantidad de números solicitados)
Ejemplo: count = 2 → Crea array de 2 elementos
buffer.readUInt32BE(i * 4)

Por cada iteración i:
Calcula la posición en el buffer: i * 4 (cada número ocupa 4 bytes)
Lee 4 bytes desde esa posición como un entero de 32 bits
BE = Big-Endian (formato estándar de red)

Ejemplo:
Bytes: [0x12, 0x34, 0x56, 0x78]
Valor: 305419896 (0x12345678 en decimal)
/ 0xffffffff

Normaliza el valor al rango [0, 1)
0xffffffff es el valor máximo de 32 bits (4,294,967,295 en decimal)
Fórmula: valor / 4,294,967,295
Ejemplo: 1,073,741,824 / 4,294,967,295 ≈ 0.25
*/

import { randomBytes } from 'crypto';

// Función para generar números aleatorios criptográficamente seguros
export const generateSecureRandoms = (count: number): number[] => {
  // Genera un buffer de bytes aleatorios seguros
  // - count * 4: Cada número requiere 4 bytes (32 bits)
  const buffer = randomBytes(count * 4);

  // Convierte el buffer en un array de números entre 0 y 1
  return Array.from(
    { length: count },
    (_, i) =>
      // Lee 4 bytes del buffer en posición i*4 como entero de 32 bits (Big-Endian)
      buffer.readUInt32BE(i * 4) /
      // Normaliza el valor dividiendo por el máximo de 32 bits (0xFFFFFFFF)
      0xffffffff,
  );
};

/* 
¿Por qué es Seguro?
Fuente de aleatoriedad

randomBytes usa generadores criptográficos del sistema operativo
En Linux: /dev/urandom o getrandom() syscall
En Windows: BCryptGenRandom
Adecuado para aplicaciones de seguridad y juegos de azar

Precisión de 32 bits
Cada número tiene 4,294,967,296 valores posibles
Mucho más preciso que Math.random() (48 bits en Chrome pero no criptográfico)

Distribución uniforme
Todos los valores tienen igual probabilidad de aparición
No hay sesgos en la distribución
*/
