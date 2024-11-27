export interface ResponseResult<T> {
    message?: string;
    success: boolean;
    data?: T;
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
    errors?: string[];
  }
  