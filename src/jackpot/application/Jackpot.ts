import { TYPESOLUTION } from './enums/TYPESOLUTION';
import { IConfigJackpot } from './interfaces/IConfigJackpot';
import { IJackpotResolve } from './interfaces/IJackpotResolve';
import { INumberDataBetInfo } from './interfaces/INumberDataBetInfo';
import { IReport } from './interfaces/IReport';
import { shuffleArray } from './utils/FisherYates';
import { generateSecureRandoms } from './utils/SecureRandomGenerator';

export class Jackpot {
  private readonly NUMBER_MAP: Record<string, number> = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    '13': 13,
    '14': 14,
    '15': 15,
    '16': 16,
    '17': 17,
    '18': 18,
    '19': 19,
    '20': 20,
    '21': 21,
    '22': 22,
    '23': 23,
    '24': 24,
    '25': 25,
    '26': 26,
    '27': 27,
    '28': 28,
    '29': 29,
    '30': 30,
    '31': 31,
    '32': 32,
    '33': 33,
    '34': 34,
    '35': 35,
    '36': 36,
    '00': 37,
  };

  private readonly COLOR_MAP: Map<string, 'red' | 'black'> = new Map();
  private config: IConfigJackpot; // Configuración de la ruleta (probabilidades, multiplicadores, etc.)
  private numbersData: INumberDataBetInfo[]; // Datos de cada número (0-37) con información de apuestas.
  private balanceAvailableForRewards: number; // Saldo disponible para premiar
  private numberOfBets: number; // numero total de apuestas
  private numberOfBetsStraightBet: number; // numero total de apuestas plenas
  private fragmentNoBets: INumberDataBetInfo[]; // Segmento sin apuestas
  private fragmentBetsNotStraight: INumberDataBetInfo[]; // Segmento de apuestas que no son plenas
  private fragmentBetsStraight: INumberDataBetInfo[]; // Segmento de apuestas plenas
  private stakeAmount: number; // cantidad de saldo en el paño.
  private report: IReport;

  // constructor
  constructor(_config: IConfigJackpot) {
    this.config = _config; // Configuracion
    this.balanceAvailableForRewards = 0; // Saldo disponible para premiar
    this.numberOfBets = 0; // numero total de apuestas
    this.numberOfBetsStraightBet = 0; // numero total de apuestas plenas
    this.stakeAmount = 0; // cantidad de saldo en el paño.
    // Inicializa 38 espacios de datos (0 a 37, siendo 37 = '00')
    this.numbersData = Array.from({ length: 38 }, (_, index) => ({
      number: index, // Asigna el índice actual (0 a 37) -- representa el numero del tablero
      financialWeight: 0, // Peso financiero del número
      isStraightBet: false, // Tiene apuestas plenas?
      betCount: 0, // Veces que fue apostado
      sampleOfMultipliers: Array.from(
        { length: this.config.sizeJackpots },
        () => 0,
      ),
    }));
    // segmentos de apuestas
    this.fragmentNoBets = []; // Segmento sin apuestas
    this.fragmentBetsNotStraight = []; // Segmento de apuestas que no son plenas
    this.fragmentBetsStraight = []; // Segmento de apuestas plenas
    this.initColorMap();
    this.report = {
      virtualBank: 0,
      balanceAvailableForRewards: 0,
      fragmentNoBets: 0,
      fragmentBetsNotStraight: 0,
      fragmentBetsStraight: 0,
      stakeAmount: 0,
      solution: TYPESOLUTION.NIL,
      path: '',
    };
  }

  private initColorMap(): void {
    const reds = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];
    for (let i = 1; i <= 36; i++) {
      this.COLOR_MAP.set(i.toString(), reds.includes(i) ? 'red' : 'black');
    }
  }

  // Convierte número en string a índice numérico  // refactorizado
  private getNumberToIndex(number: string): number {
    return this.NUMBER_MAP[number] ?? -1;
  }

  // Registra una apuesta en el sistema
  private addBet(
    numbers: string[],
    amount: number,
    reward: number,
    isStraightBet: boolean = false,
  ): void {
    const betWeight = Number((amount / numbers.length) * reward); // Calcula peso: (monto / números cubiertos) * multiplicador de pago
    numbers.forEach((num) => {
      // Aplica peso a cada número apostado
      const index = this.getNumberToIndex(num);
      if (index !== -1) {
        // Si es número válido
        this.numbersData[index].financialWeight += betWeight; // Acumula peso financiero
        this.numbersData[index].betCount++; // Incrementa contador de apuestas para este número
      }
    });
    this.numberOfBets++; // Incrementa contador global de apuestas
    this.stakeAmount += amount;
  }

  betStraight(number: string, amount: number): void {
    // Apuesta plena (a un solo número)
    const index = this.getNumberToIndex(number);
    if (index !== -1) {
      this.numbersData[index].isStraightBet = true; // Marca que este número tiene apuestas plenas
      this.numberOfBetsStraightBet++; // Contador de apuestas plenas
      if (this.config.sizeJackpots > 0) {
        for (let k = 0; k < this.config.collectionOfMultipliers.length; k++) {
          this.numbersData[index].sampleOfMultipliers[k] +=
            this.config.collectionOfMultipliers[k] * amount;
        }
      }
    }
    this.addBet([number], amount, this.config.betPrizeMoney.straightUp); // Registra la apuesta
  }

  // Apuesta split (2 números adyacentes) -- semipleno **
  betSplit(number: number, amount: number): void {
    this.addBet(
      [number.toString()],
      amount / 2,
      this.config.betPrizeMoney.split,
    );
  }

  // Apuesta street (fila de 3 números)  --- calle **
  betStreet(number: number, amount: number): void {
    this.addBet(
      [number.toString()],
      amount / 3,
      this.config.betPrizeMoney.street,
    );
  }

  // Apuesta corner (esquina de 4 números) --- cuadro **
  betCorner(number: number, amount: number): void {
    // Ejemplo para base=1: [1, 2, 4, 5]
    this.addBet(
      [number.toString()],
      amount / 4,
      this.config.betPrizeMoney.corner,
    );
  }

  // Apuesta basket (0, 00, 1, 2, 3)
  betBasket(amount: number): void {
    this.addBet(
      ['0', '00', '1', '2', '3'],
      amount,
      this.config.betPrizeMoney.basket,
    );
  }

  // Apuesta double street (2 filas = 6 números) /6 --- doble calle **
  betDoubleStreet(number: number, amount: number): void {
    this.addBet(
      [number.toString()],
      amount / 6,
      this.config.betPrizeMoney.line,
    );
  }

  // Apuesta a docena (1-12, 13-24, 25-36)
  betDozen(dozen: number, amount: number): void {
    const start = (dozen - 1) * 12 + 1; // Calcula inicio de la docena (1, 13 o 25)
    const numbers = Array.from({ length: 12 }, (_, i) =>
      (start + i).toString(),
    ); // Genera 12 números consecutivos
    this.addBet(numbers, amount, this.config.betPrizeMoney.dozen);
  }

  // Apuesta a columna (primera, segunda o tercera columna)
  betColumn(column: number, amount: number): void {
    const numbers = Array.from({ length: 12 }, (_, i) =>
      (column + i * 3).toString(),
    ); // Ejemplo columna 1: [1, 4, 7, ... 34]
    this.addBet(numbers, amount, this.config.betPrizeMoney.column);
  }

  // Apuesta a color (rojo/negro)
  betColor(color: 'red' | 'black', amount: number): void {
    const numbers: string[] = [];
    for (const [num, col] of this.COLOR_MAP.entries()) {
      if (col === color) {
        numbers.push(num);
      }
    }
    this.addBet(numbers, amount, this.config.betPrizeMoney.redBlack);
  }

  // Apuesta a par/impar
  betEvenOdd(type: 'even' | 'odd', amount: number): void {
    const numbers: string[] = [];
    for (let i = 1; i <= 36; i++) {
      // Solo números 1-36 (0 y 00 no aplican)
      if ((type === 'even' && i % 2 === 0) || (type === 'odd' && i % 2 !== 0)) {
        numbers.push(i.toString());
      }
    }
    this.addBet(numbers, amount, this.config.betPrizeMoney.evenOdd);
  }

  // Apuesta a bajo/alto (1-18 / 19-36)
  betHighLow(range: 'low' | 'high', amount: number): void {
    const start = range === 'high' ? 19 : 1; // 19 para alto, 1 para bajo
    const numbers = Array.from({ length: 18 }, (_, i) =>
      (start + i).toString(),
    ); // Genera 18 números consecutivos
    this.addBet(numbers, amount, this.config.betPrizeMoney.lowHigh);
  }

  /**
   ** Resolver los jackpots basado en el peso financiero de cada número
   */
  public resolve(virtualBank: number): IJackpotResolve {
    this.updateSegments(); // Divide por segmentos basado no apostados, peso financiero, apuestas plenas, etc.
    this.balanceAvailableForRewards = virtualBank * 0.055; // n-(n/18) aprox :: (1/18) : 0.055555...
    this.prepareReport(virtualBank);
    this.report.path += `x0#${this.balanceAvailableForRewards.toFixed(2)}`;
    if (this.numberOfBets === 0) {
      this.report.path += 'snbA-';
      return this.solveWithoutBets();
    }
    if (this.numberOfBets > 0 && this.numberOfBetsStraightBet === 0) {
      this.report.path += 'snsbB-';
      return this.solveWithNonStraight();
    }
    this.report.path += 'ssbC-';
    return this.solveWithStraightBets();
  }

  private prepareReport(virtualBank: number): void {
    this.report.virtualBank = virtualBank;
    this.report.balanceAvailableForRewards = this.balanceAvailableForRewards;
    this.report.fragmentNoBets = this.fragmentNoBets.length;
    this.report.fragmentBetsNotStraight = this.fragmentBetsNotStraight.length;
    this.report.fragmentBetsStraight = this.fragmentBetsStraight.length;
    this.report.stakeAmount = this.stakeAmount;
  }

  /**
   * * Fragmentar los segmentos de numeros
   */
  private updateSegments(): void {
    this.fragmentNoBets = this.numbersData.filter(
      (item) => item.betCount === 0,
    );
    shuffleArray(this.fragmentNoBets);
    this.fragmentBetsNotStraight = this.numbersData
      .filter((item) => item.betCount > 0 && !item.isStraightBet)
      .sort((a, b) => b.financialWeight - a.financialWeight);
    this.fragmentBetsStraight = this.numbersData
      .filter((item) => item.isStraightBet)
      .sort((a, b) => a.financialWeight - b.financialWeight);
  }

  /**
   * * Resolver de forma inmediata si no hay jugadores apostando
   */
  private solveWithoutBets(): IJackpotResolve {
    this.report.solution = TYPESOLUTION.NOT_BETS;
    let result: IJackpotResolve = {
      result: [],
      report: this.report,
    };
    const idealNumbers: INumberDataBetInfo[] = this.fragmentNoBets.slice(
      0,
      this.config.sizeJackpots,
    );
    idealNumbers.forEach((n) => {
      result.result.push({
        number: n.number.toString(),
        multiply:
          this.config.collectionOfMultipliers[
            Math.floor(
              Math.random() * this.config.collectionOfMultipliers.length,
            )
          ],
      });
    });
    this.report.path += 'aZ-';
    this.restart();
    //return result;
    return this.GetResult(result);
  }

  /**
   * * Resolver de forma inmediata si hay en el paño solo apuestas NO PLENAS.
   */
  private solveWithNonStraight(): IJackpotResolve {
    this.report.solution = TYPESOLUTION.BETS_NOT_STRAIGHT;
    let idealNumbers: INumberDataBetInfo[] = this.fragmentBetsNotStraight;
    let result: IJackpotResolve = {
      result: [],
      report: this.report,
    };
    if (idealNumbers.length < this.config.sizeJackpots) {
      this.report.solution = TYPESOLUTION.NOT_BETS_AND_BETS_NOT_STRAIGHT;
      idealNumbers.push(...this.fragmentNoBets);
    }

    if (idealNumbers.length > this.config.sizeJackpots) {
      idealNumbers = idealNumbers.slice(0, this.config.sizeJackpots);
    }
    idealNumbers.forEach((n) => {
      result.result.push({
        number: n.number.toString(),
        multiply:
          this.config.collectionOfMultipliers[
            Math.floor(
              Math.random() * this.config.collectionOfMultipliers.length,
            )
          ],
      });
    });
    this.report.path += 'bZ-';
    shuffleArray(result.result);
    this.restart();
    //return result;
    return this.GetResult(result);
  }

  /**
   * * Resolver con apuestas plenas, puede dar premios 🫥
   */
  private solveWithStraightBets(): IJackpotResolve {
    let result: IJackpotResolve = {
      result: [],
      report: this.report,
    };
    const candidates = this.fragmentBetsStraight.filter(
      (item) => item.financialWeight <= this.balanceAvailableForRewards,
    );
    if (candidates.length === 0) {
      this.report.path += 'CD-';
      if (this.fragmentBetsNotStraight.length > 0) {
        this.report.path += 'CDB-';
        return this.solveWithNonStraight();
      } else {
        //console.log('No hay numeros sin apuestas!. Hay que premiar a riezgo, fuera de rango');
        this.report.path += 'CDx-';
        result.result.push({
          number: this.fragmentBetsStraight[0].number.toString(),
          multiply: this.config.collectionOfMultipliers[0],
        });
      }
    } else {
      this.report.path += 'CE-';
      for (let c = 0; c < candidates.length; c++) {
        let i = 0;
        for (let k = 0; k < candidates[c].sampleOfMultipliers.length; k++) {
          if (
            this.balanceAvailableForRewards <
            candidates[c].sampleOfMultipliers[k]
          )
            break;
          i = k;
        }
        if (result.result.length >= this.config.sizeJackpots) {
          break;
        }
        result.result.push({
          number: candidates[c].number.toString(),
          multiply: this.config.collectionOfMultipliers[i],
        });
      }
    }

    if (result.result.length < this.config.sizeJackpots) {
      this.report.path += 'CEA-';
      if (this.fragmentBetsNotStraight.length > 0) {
        for (
          let index = 0;
          index < this.fragmentBetsNotStraight.length;
          index++
        ) {
          result.result.push({
            number: this.fragmentBetsNotStraight[index].number.toString(),
            multiply:
              this.config.collectionOfMultipliers[
                Math.floor(
                  Math.random() * this.config.collectionOfMultipliers.length,
                )
              ],
          });
          if (result.result.length >= this.config.sizeJackpots) break;
        }
      }
    }
    this.report.path += 'CEZ-';
    this.report.solution = TYPESOLUTION.BETS_NOT_STRAIGHT_AND_BETS_STRAIGHT;
    shuffleArray(result.result);
    this.restart();
    return this.GetResult(result);
  }

  private GetResult(_result: IJackpotResolve): IJackpotResolve {
    if (_result.result.length > 0) {
      const size: number =
        Math.floor(generateSecureRandoms(1)[0] * this.config.sizeJackpots) + 1;
      const result: IJackpotResolve = {
        result: _result.result.slice(0, size),
        report: _result.report,
      };
      result.report.path +=
        'i' + _result.result.length + 'o' + result.result.length + '!R';
      return result;
    }
    return _result;
  }

  /**
   * * Reiniciar datos para una nueva ronda
   */
  private restart() {
    this.balanceAvailableForRewards = 0;
    this.numberOfBets = 0;
    this.numberOfBetsStraightBet = 0;
    this.stakeAmount = 0;
    this.numbersData.forEach((data) => {
      data.financialWeight = 0;
      data.isStraightBet = false;
      data.betCount = 0;
      data.sampleOfMultipliers = Array.from(
        { length: this.config.sizeJackpots },
        () => 0,
      );
    });
    this.fragmentNoBets = [];
    this.fragmentBetsNotStraight = [];
    this.fragmentBetsStraight = [];
    this.report = {
      virtualBank: 0,
      balanceAvailableForRewards: 0,
      fragmentNoBets: 0,
      fragmentBetsNotStraight: 0,
      fragmentBetsStraight: 0,
      stakeAmount: 0,
      solution: TYPESOLUTION.NIL,
      path: '',
    };
  }
}
