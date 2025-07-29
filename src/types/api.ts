export interface PaginatedApiResponse<T> {
  data: T[];
  meta?: {
    total: number;
    page?: number;
    limit?: number;
  };
  message?: string; 
  error?: boolean; 
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: boolean;
}