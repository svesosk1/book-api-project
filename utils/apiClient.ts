import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class APIClient {
  private client: AxiosInstance;

  constructor(baseURL = process.env.BASE_URL || 'https://fakerestapi.azurewebsites.net') {
    this.client = axios.create({ baseURL });
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }
}
