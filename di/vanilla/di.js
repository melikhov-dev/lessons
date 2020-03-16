
class Dog {
    constructor(output) {
        this._output = output;
    }
    bark(message) {
        this._output.print(message);
    }
}

class CliOutput {
    print(message) {
        process.stdout.write(message);
    }
}

const dog = new Dog(new CliOutput());
dog.bark('bow-wow');
