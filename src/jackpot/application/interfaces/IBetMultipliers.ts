export interface IBetMultipliers {
  straightUp: number; // Pleno / Straight Up (Ej: 17) → "Número completo"
  split: number; // Split / Split Bet (Ej: 14-17) → "Caballo"
  street: number; // Calle / Street Bet (Ej: 4-5-6) → "Transversal"
  corner: number; // Esquina / Corner Bet (Ej: 1-2-4-5) → "Cuadro"
  line: number; // Línea / Line Bet (Ej: 1-2-3-4-5-6) → "Doble calle"
  dozen: number; // Docena / Dozen Bet (Ej: 1-12) → "Primera docena"
  column: number; // Columna / Column Bet (Ej: 1-4-7-...-34) → "Columna 1"
  redBlack: number; // Rojo/Negro / Red/Black (Ej: Rojo: 1, 3, 5...) → "Color"
  evenOdd: number; // Par/Impar / Even/Odd (Ej: Par: 2, 4, 6...) → "Par"
  lowHigh: number; // Falta/Pasa / Low/High (1-18 / 19-36) → "Falta (1-18)"
  basket: number; // Five Bet (0, 00, 1, 2, 3) → "Canasta (solo en ruleta americana)"
}
