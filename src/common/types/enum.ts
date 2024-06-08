export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export enum CurrencyCodeEnum {
  USD = 'USD',
  KHR = 'KHR',
}

export enum CurrencySymbolEnum {
  USD = '$',
  KHR = '៛',
}

export enum WalletStatus {
  NONE = 'NONE',
  ACTIVE = 'ACTIVE',
  SUSPEND = 'SUSPEND',
  BANNED = 'BANNED',
}

export enum TransactionKind {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
}

// registerEnumType(AssetCodeEnum, { name: 'AssetCodeEnum' });
