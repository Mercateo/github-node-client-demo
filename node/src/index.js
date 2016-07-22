const questions = require('./handling/questions');
const prompting = require('./handling/prompting');
const callbacks = require('./handling/callbacks');

const main = () => {
    prompting.prompt(questions.askDeveloperType(), callbacks.onHandleType);
};

main();