import {Controller, Get, Headers, HttpService} from '@nestjs/common';
import {map} from "rxjs/operators";

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('send-request')
  sendRequest(@Headers() headers) {
    return this.httpService.get("http://localhost:3000/get-request")
        .pipe(map((response) => response.data));
  }

  @Get('get-request')
  getRequest(@Headers() headers): string {
    return headers;
  }
}
