import { clearConsole } from './helpers';
import { ConsoleAdapter } from "botbuilder";

clearConsole();

const adapter = new ConsoleAdapter();

adapter.listen(async (context) => {
    await context.sendActivity('Hello, bot!');
});