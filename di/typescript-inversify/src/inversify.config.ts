import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { IOutput } from "./interfaces";
import { CliOutput } from "./cli-output";
import { Dog } from "./dog";

const myContainer = new Container();
myContainer.bind<IOutput>(TYPES.IOutput).to(CliOutput);
myContainer.bind<Dog>(TYPES.Dog).to(Dog);

export { myContainer };
