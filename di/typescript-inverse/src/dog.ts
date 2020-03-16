import {IOutput} from './interfaces';

export class Dog {
	constructor(private output: IOutput) {}

	bark(message: string) {
		this.output.print(message);
	}
}
