import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AsyncStorageService {
  private readonly asyncStore = new AsyncLocalStorage<Map<string, string>>();

  getAsyncStorage() {
    return this.asyncStore;
  }

  static getInitialStore() {
    return new Map();
  }

  getToken(): string {
    return this.asyncStore.getStore().get('auth');
  }

  setToken(token: string) {
    this.asyncStore.getStore().set('auth', token);
  }
}
