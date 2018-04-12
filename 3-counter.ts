import { clearConsole } from './helpers';
import { ConsoleAdapter, ConversationState, MemoryStorage } from "botbuilder";

clearConsole();

interface DemoState {
    counter: number;
}

const adapter = new ConsoleAdapter();

const stateManager = new ConversationState<DemoState>(new MemoryStorage());
adapter.use(stateManager);

adapter.listen(async (context) => {
    if(context.activity.type === 'message') {
        let state = stateManager.get(context);
        if(!state.counter) state.counter = 0;
        state.counter++;
        await context.sendActivity('- Echo ' + context.activity.text);
        await context.sendActivity(`- You have been here ${state.counter} times`);
        await stateManager.write(context);
    }
});