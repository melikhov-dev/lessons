import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error('My Error');
    return 'Hello World!';
  }
}
