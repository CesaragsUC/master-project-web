export interface Cart {
    customerId?: string;
    totalPrice?: number;
    items?: CartItens[];

}

export interface CartItens {
    productId?: string;
    productName?: string;
    price?: number;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
}