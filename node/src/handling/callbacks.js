/**
 * Created by alexander on 04.07.16.
 */
const questions = require('./questions');
const mapping = require('./mapping');
const prompting = require('./prompting');
const logging = require('./logging');
const requests = require('./requests');
const User = require('../types/User');
const Organization = require('../types/Organization');

const createType = (url, typeClass) => {
    requests.get(url)
        .then((res) => {
            let type = new typeClass(res.body);
            onHandleDeveloper(type);
        });
};

const onHandleType = (answer) => {
    mapping.mapTypeHandling(answer.type, module.exports)();
};

const onHandleUser = () => {
    prompting.prompt(questions.askUserName(), (answer) => {
        console.log('getting user information...');
        let url = `${requests.endpoint}/users/${answer.userName}`;
        createType(url, User)
    });
};

const onHandleOrganization = () => {
    prompting.prompt(questions.askOrganizationName(), (answer) => {
        console.log('getting organization information...');
        let url = `${requests.endpoint}/orgs/${answer.organizationName}`;
        createType(url, Organization);
    });
};

const onHandleDeveloper = (developer) => {
    mapping.mapDeveloperHandling(developer.type)(module.exports, developer);
};

const onHandleSubs = (fn, developer, key) => {
    fn(developer, () => {
        if (developer[key].length <= 0) {
            logging.no(key);
        } else {
            logging.subAttrs(developer[key]);
        }
        prompting.prompt(questions.askRepeat(),
            (answer) => onHandleRepeat(answer.next, developer));
    });
};

const onHandleRepos = (developer) => {
    let reposAvailable = () => {
        if (developer.repos.length <= 0) {
            console.log(`no repos...\n`);
            onHandleDeveloper(developer);
        } else {
            let reposNameOnly = developer.repos.map((repo) => repo.name);
            prompting.prompt(questions.askRepo(reposNameOnly),
                (answer) => {
                    if (answer.repo === questions.back) {
                        onHandleDeveloper(developer);
                    } else {
                        let selection = developer.repos.find((repo) => answer.repo === repo.name);
                        onHandleCommits(developer, selection)
                    }
                });
        }
    };

    if(!developer.repos)
        requests.retrieveRepos(developer, reposAvailable);
    else
        reposAvailable();
};

const onHandleCommits = (developer, repo) => {
    let commitsAvailable = () => {
        if (repo.commits.length <= 0) {
            console.log(`no commits...\n`);
            onHandleRepos(developer);
        } else {
            let truncMessage = (commit) => { return commit.message.replace('\\n', ' ').substr(0, 30); };
            let commitMessageOnly = repo.commits.map((commit) => truncMessage(commit));
            prompting.prompt(questions.askCommits(commitMessageOnly),
                (answer) => {
                    if(answer.commit === questions.back) {
                        onHandleRepos(developer);
                    } else {
                        let selection = repo.commits.find((commit) => answer.commit === truncMessage(commit));
                        requests.get(selection.url)
                            .then((res) => {
                                let files = res.body.files;
                                for (let file of files) {
                                    console.log(`----- ${file.filename} -----`);
                                    logging.logPatch(file.patch);
                                    console.log('\n');
                                }
                                onHandleCommits(developer, repo);
                            });
                    }
                });
        }
    };

    if(!repo.commits)
        requests.retrieveCommits(repo, commitsAvailable);
    else
        commitsAvailable();
};

const onHandleGists = (user) => {
    const gistsAvailable = () => {
        if (user.gists.length <= 0) {
            console.log(`no gists...\n`);
            onHandleDeveloper(user);
        } else {
            let gistsDescrOnly = user.gists.map((gist) => gist.description);
            prompting.prompt(questions.askGists(gistsDescrOnly),
                (answer) => {
                    if(answer.gist === questions.back) {
                        onHandleDeveloper(user);
                    } else {
                        let selection = user.gists.find((gist) => answer.gist === gist.description);
                        requests.retrieveSources(selection.filesSource)
                            .then((result) => {
                                for (let name in result) {
                                    if(result.hasOwnProperty(name)) {
                                        console.log(`----- ${name} -----\n${result[name]}\n`);
                                    }
                                }
                                onHandleGists(user);
                            });
                    }
                });
        }
    };

    if(!user.gists)
        requests.retrieveGists(user, gistsAvailable);
    else
        gistsAvailable();
};

const onHandleEvents = (developer) => {
    requests.retrieveEvents(developer, () => {
        if (developer.events.length <= 0) {
            console.log(`no events...\n`)
        } else {
            logging.subAttrs(developer.events);
        }
        onHandleDeveloper(developer);
    });
};

const onHandleFollowers = (user) => {
    requests.retrieveFollowers(user, () => {
        if (user.followers.length <= 0) {
            console.log(`no followers...\n`)
        } else {
            logging.subAttrs(user.followers);
        }
        onHandleDeveloper(user);
    });
};

const onHandleFollowing = (user) => {
    requests.retrieveFollowing(user, () => {
        if (user.following.length <= 0) {
            console.log(`no followings...\n`)
        } else {
            logging.subAttrs(user.following);
        }
        onHandleDeveloper(user);
    });
};

const onHandleSubscriptions = (user) => {
    requests.retrieveSubscriptions(user, () => {
        if (user.subscriptions.length <= 0) {
            console.log(`no subscriptions...\n`)
        } else {
            logging.subAttrs(user.subscriptions);
        }
        onHandleDeveloper(user);
    });
};

const onHandleMembers = (org) => {
    // only public members at the moment (auth required)
    requests.retrieveMembers(org, () => {
        if (org.members.length <= 0) {
            console.log(`no members...\n`)
        } else {
            logging.subAttrs(org.members);
        }
        onHandleDeveloper(org);
    });
};

const onHandleDetails = (developer) => {
    console.log(developer.details.pretty);
    onHandleDeveloper(developer);
};

const onHandleRepeat = (answer) => {
    switch (answer) {
        case questions.choicesNext.user:
            onHandleUser();
            break;
        case questions.choicesNext.organization:
            onHandleOrganization();
            break;
        case questions.choicesNext.exit:
            console.log('exiting client');
            break;
    }
};

module.exports = {
    onHandleType,
    onHandleUser,
    onHandleOrganization,
    onHandleDeveloper,
    onHandleRepos,
    onHandleGists,
    onHandleCommits,
    onHandleEvents,
    onHandleFollowers,
    onHandleFollowing,
    onHandleSubscriptions,
    onHandleMembers,
    onHandleDetails,
    onHandleRepeat
};