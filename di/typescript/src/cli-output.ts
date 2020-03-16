export class CliOutput {
	print(message: string) {
		process.stdout.write(message);
	}
}
