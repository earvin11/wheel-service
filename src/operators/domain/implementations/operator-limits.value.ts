import {
  LimitBet,
  OperatorLimitsEntity,
} from '../entites/operator-limits.entity';

export class OperatorLimits implements OperatorLimitsEntity {
  currency: string;
  operator: string;
  short: string;
  minBet: number;
  maxBet: number;
  maxBetPosition: number;
  pleno: LimitBet;
  semipleno: LimitBet;
  cuadro: LimitBet;
  calle: LimitBet;
  linea: LimitBet;
  columna: LimitBet;
  docena: LimitBet;
  cubre: LimitBet;
  chanceSimple: LimitBet;
  even_odd: LimitBet;
  color: LimitBet;
  specialCalle: LimitBet;

  constructor(data: OperatorLimitsEntity) {
    this.currency = data.currency;
    this.operator = data.operator;
    this.short = data.short;
    this.minBet = data.minBet;
    this.maxBet = data.maxBet;
    this.maxBetPosition = data.maxBetPosition;
    this.pleno = data.pleno;
    this.semipleno = data.semipleno;
    this.cuadro = data.cuadro;
    this.calle = data.calle;
    this.linea = data.linea;
    this.columna = data.columna;
    this.docena = data.docena;
    this.cubre = data.cubre;
    this.chanceSimple = data.chanceSimple;
    this.even_odd = data.even_odd;
    this.color = data.color;
    this.specialCalle = data.specialCalle;
  }
}
