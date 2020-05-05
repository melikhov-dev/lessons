import {Module} from '@nestjs/common';
import {ArticleService} from './article.service';
import { ConfigService } from '@nestjs/config';
import {ArticleController} from './article.controller';

@Module({
	providers: [ArticleService, ConfigService],
	controllers: [ArticleController]
})
export class ArticleModule {}
