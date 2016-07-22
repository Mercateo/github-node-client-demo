/**
 * Created by alexander on 08.07.16.
 */
const inquirer = require('inquirer');

const prompt = (question, callback) => {
    inquirer.prompt([question]).then(callback);
};

module.exports = {
    prompt
};
