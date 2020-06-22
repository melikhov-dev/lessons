import {GetAccountBalanceQuery} from '../ports/in/get-account-balance.query';
import {AccountId} from '../entities/account.entity';
import {LoadAccountPort} from '../ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery{
	constructor(private readonly _loadAccountPort: LoadAccountPort) {
	}
	async getAccoutBalance(accountId: AccountId) {
		const account = await this._loadAccountPort.loadAccount(accountId);
		return account.calculateBalance();
	}
}
