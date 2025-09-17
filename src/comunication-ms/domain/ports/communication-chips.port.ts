export abstract class CommunicationChipsPort {
  abstract findByOperatorAndCurrency(
    operator: string,
    currency: string,
  ): Promise<ChipsByOperatorAndCurrencyResp>;
}

export interface ChipsByOperatorAndCurrencyResp {
  _id: string;
  operator: string;
  currency: string;
  number: string;
  value: number;
  color: Color;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Color {
  primary: string;
  secondary: string;
  _id: string;
}
