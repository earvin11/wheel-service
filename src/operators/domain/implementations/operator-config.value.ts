import { OperatorConfigEntity } from '../entites/operator-config.entity';

export class OperatorConfig implements OperatorConfigEntity {
  public operator: string;
  public order: number;
  public currencies: string[];
  public pleno?: number;
  public semiPleno?: number;
  public cuadro?: number;
  public calle?: number;
  public linea?: number;
  public column?: number;
  public dozens?: number;
  public chanceSimple?: number;
  public evenOdd?: number;
  public color?: number;
  public cubre?: number;
  public specialCalle?: number;
  public layout?: boolean;
  public template?: string;
  public logo?: string;

  constructor(data: OperatorConfigEntity) {
    this.operator = data.operator;
    this.order = data.order;
    this.currencies = data.currencies;
    this.pleno = data.pleno;
    this.semiPleno = data.semiPleno;
    this.cuadro = data.cuadro;
    this.calle = data.calle;
    this.linea = data.linea;
    this.column = data.column;
    this.dozens = data.dozens;
    this.chanceSimple = data.chanceSimple;
    this.evenOdd = data.evenOdd;
    this.color = data.color;
    this.cubre = data.cubre;
    this.specialCalle = data.specialCalle;
    this.layout = data.layout;
    this.template = data.template;
    this.logo = data.logo;
  }
}
