export interface BackendRes<T> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}
