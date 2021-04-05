import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AsyncStorageService } from './async-storage/async-storage.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly asyncStorageService: AsyncStorageService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const authToken = context.switchToHttp().getRequest().headers?.auth;
    this.asyncStorageService.setToken(authToken);
    return next.handle();
  }
}
