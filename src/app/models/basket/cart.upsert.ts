import { CartItens } from "./cart";

export interface CartUpsert {
    customerId?: string;
    items?: CartItens[];
}