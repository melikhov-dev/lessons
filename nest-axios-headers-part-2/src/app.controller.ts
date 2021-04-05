import { Controller, Get, Headers, All } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpRequestService } from './http-request/http-request.service';

@Controller()
export class AppController {
  constructor(private readonly requestService: HttpRequestService) {}

  @All('send-http-request')
  sendRequest(@Headers() headers) {
    return this.requestService
      .get('http://localhost:3000/get-request')
      .pipe(map((response) => response.data));
  }

  @Get('get-http-request')
  getRequest(@Headers() headers): string {
    return headers;
  }
}
