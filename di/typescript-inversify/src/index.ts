import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import {Dog} from './dog';

class App {
	createDog() {
		const dog = myContainer.get<Dog>(TYPES.Dog);
		dog.bark('bow-wow');
	}
}

const app = new App();
app.createDog();
