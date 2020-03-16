
class Dog {
    bark(message) {
        const cliOutput = new CliOutput();
        cliOutput.print(message);
    }
}

class CliOutput {
    print(message) {
        process.stdout.write(message);
    }
}

const dog = new Dog();
dog.bark('bow-wow');
