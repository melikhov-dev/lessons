import {AccountEntity} from '../../entities/account.entity';

export interface UpdateAccountStatePort {
	updateActivities(account: AccountEntity);
}
