import type {CliOutput} from './cli-output';

export class Dog {
	constructor(private output: CliOutput) {}

	bark(message: string) {
		this.output.print(message);
	}
}
