export interface Cart {
    customerId?: string;
    totalPrice?: number;
    items?: CartItens[];
    subTotal?: number;
    userName?: string;
    couponCode?: string;
    discountApplied?:number;
}

export interface CartItens {
    productId?: string;
    productName?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    imageUrl?: string;
}