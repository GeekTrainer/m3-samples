import { clearConsole } from './helpers';
import { ConsoleAdapter, ConversationState, MemoryStorage } from "botbuilder";

clearConsole();

interface DemoState {
    counter: number;
    currentQuestion: string;
}

const adapter = new ConsoleAdapter();

const stateManager = new ConversationState<DemoState>(new MemoryStorage());
adapter.use(stateManager);

adapter.listen(async (context) => {
    if(context.activity.type === 'message') {
        // if(!state.counter) state.counter = 0;
        // state.counter++;
        // await context.sendActivity('- Echo ' + context.activity.text);
        // await context.sendActivity(`- You have been here ${state.counter} times`);

        let state = stateManager.get(context);
        if(!state.currentQuestion) {
            state.currentQuestion = 'name';
            await context.sendActivity(`What is your name?`);
        } else if(state.currentQuestion === 'name') {
            state.currentQuestion = undefined;
            await context.sendActivity(`Welcome, ${context.activity.text}`);
        }
        await stateManager.write(context);
    }
});