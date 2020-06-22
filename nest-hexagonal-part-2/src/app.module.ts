import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {join} from "path";
import {SendMoneyService} from './domains/services/send-money.service';
import {SendMoneyUseCase, SendMoneyUseCaseSymbol} from './domains/ports/in/send-money.use-case';
import {AccountPersistenceModule} from './modules/account-persistence/account-persistence.module';
import {ActivityOrmEntity} from './modules/account-persistence/activity.orm-entity';
import {AccountOrmEntity} from './modules/account-persistence/account.orm-entity';
import {AccountWebModule} from './modules/account-web/account-web.module';
import {AccountPersistenceAdapterService} from './modules/account-persistence/account-persistence-adapter.service';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: join(__dirname, '..', 'data', 'data.sqlite'),
			logging: true,
			autoLoadEntities: true
		}),
		AccountPersistenceModule,
		AccountWebModule
	]
})
export class AppModule {}
