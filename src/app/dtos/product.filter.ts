export interface ProductFilter {
    onlyActive?: boolean;
    name?: string ;
    minPrice?: number;
    maxPrice?: number;
    page?:  number;
    pageSize?: number;
    orderBy?: string;
    orderDirection?: string ;
  
  }

export interface FilterByStatus{
    name: string;
    code: string;
}

export interface FilterByOrder{
    name: string;
    code: string;
}

export interface filterByDirections{
    name: string;
    code: string;
}

export const statusOptions = [
    { name: 'Active', code: 'true' },
    { name: 'Inactive', code: 'false' }
];

export const orderByOptions = [
    { name: 'Name', code: 'name' },
    { name: 'CreatAt', code: 'CreatAt' },
];

export const orderByDirections = [
    { name: 'Ascending', code: 'asc' },
    { name: 'Descending', code: 'desc' }
];