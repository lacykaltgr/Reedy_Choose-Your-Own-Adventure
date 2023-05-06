export declare class AddCreditCardDto {
    paymentMethodId: string;
}
export declare class RemoveCreditCardDto {
    paymentMethodId: string;
}
export declare class SetDefaultCreditCardDto {
    paymentMethodId: string;
}
export declare class RemoveBankAccountDto {
    bankAccountId: string;
}
export declare class TransferDto {
    source: string;
    destination: string;
    amount: number;
    currency: string;
}
