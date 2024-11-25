import { Injectable } from '@angular/core';
    
@Injectable()
export class ProductService {
    getProductsData() 
    {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'https://imgur.com/jnxaemj.png',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Black Watch',
                description: 'Product Description',
                image: 'https://imgur.com/l71wQP3.png',
                price: 72,
                category: 'Accessories',
                quantity: 61,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Product Description',
                image: 'https://imgur.com/J7AUKnS.png',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
            {
                id: '1003',
                code: '244wgerg2',
                name: 'Blue T-Shirt',
                description: 'Product Description',
                image: 'https://imgur.com/8YuEAIF.png',
                price: 29,
                category: 'Clothing',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1004',
                code: 'h456wer53',
                name: 'Bracelet',
                description: 'Product Description',
                image: 'https://imgur.com/We2LNNZ.png',
                price: 15,
                category: 'Accessories',
                quantity: 73,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1005',
                code: 'av2231fwg',
                name: 'Brown Purse',
                description: 'Product Description',
                image: 'https://imgur.com/pox9p47.png',
                price: 120,
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1006',
                code: 'bib36pfvm',
                name: 'Chakra Bracelet',
                description: 'Product Description',
                image: 'https://imgur.com/gyZEaqV.png',
                price: 32,
                category: 'Accessories',
                quantity: 5,
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },
            {
                id: '1007',
                code: 'mbvjkgip5',
                name: 'Galaxy Earrings',
                description: 'Product Description',
                image: 'https://imgur.com/xtRRSMk.png',
                price: 34,
                category: 'Accessories',
                quantity: 23,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1008',
                code: 'vbb124btr',
                name: 'Game Controller',
                description: 'Product Description',
                image: 'https://imgur.com/UwWWrR7.png',
                price: 99,
                category: 'Electronics',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 4
            },
            {
                id: '1009',
                code: 'cm230f032',
                name: 'Gaming Set',
                description: 'Product Description',
                image: 'https://imgur.com/WK2k6qt.png',
                price: 299,
                category: 'Electronics',
                quantity: 63,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1010',
                code: 'plb34234v',
                name: 'Gold Phone Case',
                description: 'Product Description',
                image: 'https://imgur.com/GauANus.png',
                price: 24,
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1011',
                code: '4920nnc2d',
                name: 'Green Earbuds',
                description: 'Product Description',
                image: 'https://imgur.com/gd2phOf.png',
                price: 89,
                category: 'Electronics',
                quantity: 23,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1012',
                code: '250vm23cc',
                name: 'Green T-Shirt',
                description: 'Product Description',
                image: 'https://imgur.com/ZJkAzhc.png',
                price: 49,
                category: 'Clothing',
                quantity: 74,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1013',
                code: 'fldsmn31b',
                name: 'Grey T-Shirt',
                description: 'Product Description',
                image: 'grey-t-shirt.jpg',
                price: 48,
                category: 'Clothing',
                quantity: 0,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 3
            },
            {
                id: '1014',
                code: 'waas1x2as',
                name: 'Headphones',
                description: 'Product Description',
                image: 'https://imgur.com/EXbdCmi.png',
                price: 175,
                category: 'Electronics',
                quantity: 8,
                inventoryStatus: 'LOWSTOCK',
                rating: 5
            },
            {
                id: '1015',
                code: 'vb34btbg5',
                name: 'Light Green T-Shirt',
                description: 'Product Description',
                image: 'https://imgur.com/S5snWKD.png',
                price: 49,
                category: 'Clothing',
                quantity: 34,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1016',
                code: 'k8l6j58jl',
                name: 'Lime Band',
                description: 'Product Description',
                image: 'https://imgur.com/eFnlanB.png',
                price: 79,
                category: 'Fitness',
                quantity: 12,
                inventoryStatus: 'INSTOCK',
                rating: 3
            },
            {
                id: '1017',
                code: 'v435nn85n',
                name: 'Mini Speakers',
                description: 'Product Description',
                image: 'https://imgur.com/56nbGk0.png',
                price: 85,
                category: 'Clothing',
                quantity: 42,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            {
                id: '1018',
                code: '09zx9c0zc',
                name: 'Painted Phone Case',
                description: 'Product Description',
                image: 'painted-phone-case.jpg',
                price: 56,
                category: 'Accessories',
                quantity: 41,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1019',
                code: 'mnb5mb2m5',
                name: 'Pink Band',
                description: 'Product Description',
                image: 'https://imgur.com/MM4ovhC.png',
                price: 79,
                category: 'Fitness',
                quantity: 63,
                inventoryStatus: 'INSTOCK',
                rating: 4
            },
            
        ];
    }

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    }

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
};