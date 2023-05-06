import Stripe from 'stripe';
export declare class PaymentsService {
    private stripe;
    createCustomer(name: string, email: string): Promise<string>;
    charge(amount: number, paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    createTransfer(source: string, destination: string, amount: number, currency: string): Promise<Stripe.Response<Stripe.Transfer>>;
    attachPaymentMehod(paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.SetupIntent>>;
    removePaymentMethod(paymentMethodId: string): Promise<void>;
    getDefaultPaymentMethod(paymentMethodId: string): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    updatePaymentMethod(paymentMethodId: string, data: object): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    listPaymentMethods(customerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    setDefaultCreditCard(paymentMethodId: string, customerId: string): Promise<Stripe.Response<Stripe.Customer>>;
    listBankAccounts(customerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.CustomerSource>>>;
    removeBankAccount(customerId: string, bankAccountId: string): Promise<void>;
    updateBankAccount(customerId: string, bankAccountId: string, data: object): Promise<Stripe.Response<Stripe.BankAccount | Stripe.Card | Stripe.Source>>;
    getBankAccount(customerId: string, bankAccountId: string): Promise<Stripe.Response<Stripe.CustomerSource>>;
    createSubscription(priceId: string, customerId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    listSubscriptions(priceId: string, customerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>;
}
