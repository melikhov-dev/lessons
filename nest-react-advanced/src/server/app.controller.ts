import {Controller, Get, Render} from '@nestjs/common';

@Controller('/')
export class AppController {
	@Get(['', 'article', 'article/*'])
	@Render('layout')
	pages() {

	}
}
