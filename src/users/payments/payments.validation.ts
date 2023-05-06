import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Body } from '@nestjs/common';



export class AddCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}

export class RemoveCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}


export class SetDefaultCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}

export class RemoveBankAccountDto {

  @IsString()
  @IsNotEmpty()
  bankAccountId: string;
}

export class TransferDto {
  @IsString()
  source: string;

  @IsString()
  destination: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}