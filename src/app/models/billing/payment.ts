export interface Payment {
    id?: string;
    orderId?: string;
    customerId?: string;
    amount?: number;
    method?: number;
    status?: number;
    paymentDate?: Date;
    transactionId?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}
