import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import {ArticleListResponse} from './article.types';
const promisifiedReadDir = promisify(fs.readdir);

@Injectable()
export class ArticleService {
	constructor(private readonly _configService: ConfigService) {};

	getList(): Promise<ArticleListResponse> {
		return promisifiedReadDir(path.join(this._configService.get('dataPath'), 'articles'));
	}

	getArticle(name: string) {
		return fs.createReadStream(path.join(this._configService.get('dataPath'), 'articles', name, 'README.md'))
	}
}
