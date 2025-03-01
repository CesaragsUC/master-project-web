export interface Order {
    id?: string;
    createdAt?: string;
    customerId?: string;
    items?: OrderItem[];
    totalAmount?: number;
    status?: number;
    name?: string;
    paymentToken?: string;
}

export interface OrderItem {
    id?: string;
    orderId?: string;
    productId?: string;
    productName?: string;
    unitPrice?: number;
    quantity?: number;
    totalPrice?: number;
}
