export enum NameEventsMS {
  WALLET_AUTH = 'wallet.auth',
  WALLET_DEBIT = 'wallet.debit',
  WALLET_CREDIT = 'wallet.credit',
  WALLET_ROLLBACK = 'wallet.rollback',

  OPERATOR_BY_ID = 'show',

  GET_CURRENCY_BY_ISO_CODE = 'get-currency-by-type',

  CHIPS_BY_OPERATOR_AND_CURRENCY = 'chip.find-by-operator',

  //Reports
  CREATE_REPORT = 'report.create',
}
