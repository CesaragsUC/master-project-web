export interface CreatePayment {
    orderId?: string;
    customerId?: string;
    creditCard?: CreditCard;
}

export interface CreditCard
{
    holder?: string;
    cardNumber?: string;
    expirationDate?: string;
    securityCode?: string;
}