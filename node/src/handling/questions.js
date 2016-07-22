/**
 * Created by alexander on 22.06.16.
 */

const back = '\<return\>';

const proceed = '\<proceed\>';

const choicesNext = {
    user: 'browse another user',
    organization: 'browse another organization',
    exit: 'exit'
};

const choicesNextUser = {
    repos: 'repos',
    gists: 'gists',
    events: 'events',
    followers: 'followers',
    following: 'following',
    subscriptions: 'subscriptions',
    details: 'details'
};

const choicesNextOrg = {
    repos: 'repos',
    //issues: 'issues',
    events: 'events',
    members: 'members',
    details: 'details'
};

const choicesNextRepo = {
    commits: 'commits',
    // issues: 'issues',
    events: 'events',
    contributors: 'contributors',
    branches: 'branches',
    details: 'details'
};

const choicesDeveloperType = {
    user: 'User',
    organization: 'Organization'
};

const askDeveloperType = () => {
    return {
        type: 'list',
        name: 'type',
        message: 'Want to browse user or organization?',
        choices: [
            choicesDeveloperType.user,
            choicesDeveloperType.organization
        ]
    }
};

const askUserName = () => {
    return {
        type: 'input',
        name: 'userName',
        message: 'Enter the GitHub UserName: '
    };
};

const askOrganizationName = () => {
    return {
        type: 'input',
        name: 'organizationName',
        message: 'Enter the GitHub OrganizationName: '
    };
};

const askProceedUser = () => {
    let choices = Object.keys(choicesNextUser);
    choices.push(proceed);
    return {
        type: 'list',
        name: 'type',
        message: 'Want to browse the user\'s...',
        choices: choices
    };
};

const askProceedOrg = () => {
    let choices = Object.keys(choicesNextOrg);
    choices.push(proceed);
    return {
        type: 'list',
        name: 'type',
        message: 'Want to browse the organization\'s...',
        choices: choices
    };
};

const askProceedRepo = () => {
    return {
        type: 'list',
        name: 'type',
        message: 'Want to browse the repo\'s...',
        choices: Object.keys(choicesNextRepo)
    };
};

const askRepo = (repos) => {
    repos.push(back);
    return {
        type: 'list',
        name: 'repo',
        message: 'Choose repo to show commits of.',
        choices: repos
    };
};

const askGists = (gists) => {
    gists.push(back);
    return {
        type: 'list',
        name: 'gist',
        message: 'Choose gist to show code of.',
        choices: gists
    };
};

const askCommits = (commits) => {
    commits.push(back);
    return {
        type: 'list',
        name: 'commit',
        message: 'Choose commit to show code of.',
        choices: commits
    };
};

const askRepeat = () => {
    return {
        type: 'list',
        name: 'next',
        message: 'What do you want to do next?',
        choices: [
            choicesNext.user,
            choicesNext.organization,
            choicesNext.exit
        ]
    };
};

module.exports = {
    back,
    proceed,
    choicesNext,
    choicesNextUser,
    choicesNextOrg,
    choicesNextRepo,
    choicesDeveloperType,
    askDeveloperType,
    askUserName,
    askOrganizationName,
    askProceedUser,
    askProceedOrg,
    askProceedRepo,
    askRepo,
    askGists,
    askCommits,
    askRepeat
};
