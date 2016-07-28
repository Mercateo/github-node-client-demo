/**
 * Created by alexander on 04.07.16.
 */
const prompting = require('./prompting');
const questions = require('./questions');

const defaultError = () => {
    console.error('Non of the answers is applicable!');
};

const repeat = (callbacks) => {
    prompting.prompt(questions.askRepeat(),
        (answer) => callbacks.onHandleRepeat(answer.next));
};

const mapTypeHandling = (answer, callbacks) => {
    switch (answer) {
        case questions.choicesDeveloperType.user:
            return callbacks.onHandleUser;
        case questions.choicesDeveloperType.organization:
            return callbacks.onHandleOrganization;
        default:
            return defaultError;
    }
};

const mapDeveloperHandling = (answer) => {
    switch (answer) {
        case questions.choicesDeveloperType.user:
            return (callbacks, developer) => {
                prompting.prompt(questions.askProceedUser(), (answer) => {
                    mapProceedUser(answer.type, developer, callbacks);
                });
            };
        case questions.choicesDeveloperType.organization:
            return (callbacks, developer) => {
                prompting.prompt(questions.askProceedOrg(), (answer) => {
                    mapProceedOrganization(answer.type, developer, callbacks);
                });
            };
        default:
            return defaultError;
    }
};

const mapProceedUser = (answer, user, callbacks) => {
    switch(answer) {
        case questions.choicesNextUser.repos: 
            callbacks.onHandleRepos(user);
            break;
        case questions.choicesNextUser.gists:
            callbacks.onHandleGists(user);
            break;
        case questions.choicesNextUser.events:
            callbacks.onHandleEvents(user);
            break;
        case questions.choicesNextUser.followers:
            callbacks.onHandleFollowers(user);
            break;
        case questions.choicesNextUser.following:
            callbacks.onHandleFollowing(user);
            break;
        case questions.choicesNextUser.subscriptions:
            callbacks.onHandleSubscriptions(user);
            break;
        case questions.choicesNextUser.details:
            callbacks.onHandleDetails(user);
            break;
        case questions.proceed:
            repeat(callbacks);
            break;
        default:
            return defaultError;
    }
};

const mapProceedOrganization = (answer, org, callbacks) => {
    switch (answer) {
        case questions.choicesNextOrg.repos:
            callbacks.onHandleRepos(org);
            break;
        // case questions.choicesNextOrg.issues:
        //     callbacks.onHandleRepos(developer);
        //     break;
        case questions.choicesNextOrg.events:
            callbacks.onHandleEvents(org);
            break;
        case questions.choicesNextOrg.members:
            callbacks.onHandleMembers(org);
            break;
        case questions.choicesNextOrg.details:
            callbacks.onHandleDetails(org);
            break;
        case questions.proceed:
            repeat(callbacks);
            break;
        default:
            return defaultError;
    }
};

const mapProceedRepo = (answer, developer, repo, callbacks) => {
    switch (answer) {
        case questions.choicesNextRepo.commits:
            callbacks.onHandleCommits(developer, repo);
            break;
        // case questions.choicesNextRepo.issues:
        //     callbacks.onHandleRepos(developer);
        //     break;
        case questions.choicesNextRepo.events:
            callbacks.onHandleEvents(repo);
            break;
        case questions.choicesNextRepo.contributors:
            callbacks.onHandleMembers(repo);
            break;
        case questions.choicesNextRepo.branches:
            callbacks.onHandleBranches(repo);
            break;
        case questions.choicesNextRepo.details:
            callbacks.onHandleDetails(repo);
            break;
        case questions.proceed:
            repeat(callbacks);
            break;
        default:
            return defaultError;
    }
};

module.exports = {
    mapTypeHandling,
    mapDeveloperHandling,
    mapProceedUser,
    mapProceedOrganization,
    mapProceedRepo
};