import {Dog} from './dog';
import {CliOutput} from './cli-output';

class DogService {
	createDog() {
		const output = new CliOutput();
		const dog = new Dog(output);
		dog.bark('bow-wow');
	}
}

const dogService = new DogService();
dogService.createDog();
