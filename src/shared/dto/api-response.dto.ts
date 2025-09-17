export class ApiResponse<T> {
  public statusCode: number;
  public message?: string;
  public data: T;
  public meta?: any; // Para paginación, etc.

  constructor(statusCode: number, data: T, message?: string, meta?: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message || '';
    this.meta = meta;
  }
}
