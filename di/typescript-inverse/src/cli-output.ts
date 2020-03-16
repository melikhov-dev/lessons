import {IOutput} from './interfaces';

export class CliOutput implements IOutput{
	print(message: string) {
		process.stdout.write(message);
	}
}
