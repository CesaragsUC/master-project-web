export interface ProductUpdate {
    id?:string;
    name?: string;
    price?: number;
    active?: boolean;
    imageUri?: string;
    imageBase64?: string;
    productId?: string;
}