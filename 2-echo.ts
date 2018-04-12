import { clearConsole } from './helpers';
import { ConsoleAdapter } from "botbuilder";

clearConsole();

const adapter = new ConsoleAdapter();

adapter.listen(async (context) => {
    if(context.activity.type === 'message')
        await context.sendActivity('Echo ' + context.activity.text);
});