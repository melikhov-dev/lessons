import { Injectable, Scope, Inject } from '@nestjs/common';
import {Request} from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({scope: Scope.REQUEST })
export class UserService {

  constructor(@Inject(REQUEST) private _request: Request) {}

  isPreffered(): boolean {
    return this._request.query.preffered === 'true';
  }
}
