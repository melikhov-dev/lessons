import {HttpService, Inject, Injectable, Scope} from '@nestjs/common';
import {ASYNC_STORAGE} from "../app.constants";
import {AsyncLocalStorage} from "async_hooks";

@Injectable({scope: Scope.DEFAULT})
export class AxiosInterceptorService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(ASYNC_STORAGE) private readonly asyncStore: AsyncLocalStorage<Map<string, any>>
    ) {
        this.httpService.axiosRef.interceptors.request.use((config) => {
            const authToken = asyncStore.getStore().get('auth');
            if (authToken !== undefined) {
                config.headers = {
                    ...config.headers,
                    auth: authToken
                }
            }
            return config;
        })
    }
}
