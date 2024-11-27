export interface ApiResponse {
   // map(arg0: (p: any) => void): import("../models/product/product").Product[];
    code?: number;
    data?: any;
    exception?: string;
    messages?: string[];
    succeeded?: boolean;
}