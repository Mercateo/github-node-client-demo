const questions = require('./handling/questions');
const prompting = require('./handling/prompting');
const callbacks = require('./handling/callbacks');

const repo = require('./types/Repo');
const commit = require('./types/Commit');

const main = () => {
    prompting.prompt(questions.askDeveloperType(), callbacks.onHandleType);
};

main();