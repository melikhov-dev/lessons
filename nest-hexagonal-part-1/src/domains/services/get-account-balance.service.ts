import {GetAccountBalanceQuery} from '../ports/in/get-account-balance.query';
import {AccountId} from '../entities/account.entity';
import {LoadAccountPort} from '../ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery{
	constructor(private readonly _loadAccountPort: LoadAccountPort) {
	}
	getAccoutBalance(accountId: AccountId) {
		this._loadAccountPort.loadAccount(accountId).calculateBalance();
	}
}
