import { OperatorConfigEntity } from '../entites/operator-config.entity';

export class OperatorConfig implements OperatorConfigEntity {
  public operator: string;
  public order: number;
  public currencies: string[];
  public layout?: boolean;
  public template?: string;
  public logo?: string;

  constructor(data: OperatorConfigEntity) {
    this.currencies = data.currencies;
    this.layout = data.layout;
    this.logo = data.logo;
    this.operator = data.operator;
    this.order = data.order;
    this.template = data.template;
  }
}
