export interface OperatorConfigEntity {
  operator: string;
  order: number;
  currencies: string[];
  layout?: boolean;
  template?: string;
  logo?: string;
}
