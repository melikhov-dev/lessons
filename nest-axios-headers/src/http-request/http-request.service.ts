import { HttpService, Injectable } from '@nestjs/common';
import { AsyncStorageService } from '../async-storage/async-storage.service';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpRequestService {
  constructor(
    private readonly httpService: HttpService,
    private readonly asyncStorageService: AsyncStorageService,
  ) {}
  get(url) {
    const authToken = this.asyncStorageService.getToken();
    const config: AxiosRequestConfig = {};
    if (authToken !== undefined) {
      config.headers = {
        ...config.headers,
        auth: authToken,
      };
    }
    return this.httpService.get(url, config);
  }
}
