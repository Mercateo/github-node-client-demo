const ajax = require('superagent');
const Promise = require('promise');
const User = require('../types/User');
const Organization = require('../types/Organization');
const Repo = require('../types/Repo');
const Gist = require('../types/Gist');
const Commit = require('../types/Commit');
const Branch = require('../types/Branch');
const Event = require('../types/Event');
const Subscription = require('../types/Subscription');

const endpoint = 'https://api.github.com';

const get = (url, accept) => {
    return new Promise((resolve, reject) => {
        ajax.get(url)
            .set('Accept', accept ? accept : 'application/json')
            .end((err, res) => {
                if (res && res.statusCode < 400) {
                    resolve(res);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
    });
};

const multiGet = (generatorFn, files) => {
    var iterator = generatorFn(files);
    return new Promise((resolve, reject) => {
        let loop = (value) => {
            let result;
            try {
                result = iterator.next(value);
            } catch (err) {
                reject(err);
            }
            if (result.done)
                resolve(result.value);
            else if (typeof result.value === "object"
                && typeof result.value.then === "function")
                result.value.then(
                    (value) => {
                        loop(value)
                    }, (err) => {
                        reject(err)
                    });
            else
                loop(result.value);
        };
        loop();
    });
};

function getSubAttributesFor(subType, url) {
    return new Promise((resolve, reject) => {
        let attrName = new subType().constructor.name.toLowerCase();
        console.log(`getting ${attrName}s...`);
        get(url)
            .then((res) => {
                let attrs = [];
                res.body.forEach((attr) => {
                    attrs.push(new subType(attr));
                });
                resolve(attrs);
            }, (err) => {
                console.error(`unable to get ${attrName}s...`);
                reject(err);
            });
    });
}

const retrieve = (subType, url, setter, success, failure) => {
    getSubAttributesFor(subType, url)
        .then((res) => {
                setter(res);
                if (success)
                    success();
            }, (err) => {
                if(failure)
                    failure(err);
                else {
                    console.error(`fatal error, please start client again!`);
                    process.exit(1);
                }
            }
        );
};

const retrieveRepos = (developer, success, failure) => {
    let reposUrl = developer.source.repos_url;
    retrieve(Repo, reposUrl.split('{')[0], (r) => developer.repos = r,
        success, failure);
};

const retrieveGists = (user, success, failure) => {
    var gistsUrl = user.source.gists_url;
    retrieve(Gist, gistsUrl.split('{')[0], (r) => user.gists = r,
        success, failure);
};

const retrieveSources = (files) => {
    return new Promise((resolve, reject) => {
        let result = {};
        multiGet(function* (files) {
            for(let key in files) {
                if (files.hasOwnProperty(key)) {
                    let file = files[key];
                    let res = yield get(file.raw_url);
                    result[file.filename] = res.text;
                }
            }
            return result;
        }, files).then((result) => {
            resolve(result);
        });
    });
};

const retrieveCommits = (repo, success, failure) => {
    let commitsUrl = repo.source.commits_url;
    retrieve(Commit, commitsUrl.split('{')[0], (r) => repo.commits = r,
        success, failure);
};

const retrieveBranches = (repo, success, failure) => {
    let branchesUrl = repo.source.branches_url;
    retrieve(Branch, branchesUrl.split('{')[0], (r) => repo.branches = r,
        success, failure);
};

const retrieveTree = (tree) => {
    return new Promise((resolve, reject) => {
        let result = {};
        multiGet(function* (tree) {
            for(let leaf of tree) {
                let name = leaf.path;
                let res = yield get(leaf.url, 'application/vnd.github.v3.raw');
                result[name] = res.text;
            }
            return result;
        }, tree).then((result) => {
            resolve(result);
        });
    });
};

const retrieveEvents = (developer, success, failure) => {
    let eventsUrl = developer.source.events_url;
    retrieve(Event, eventsUrl.split('{')[0], (r) => developer.events = r,
        success, failure);
};

const retrieveFollowers = (developer, success, failure) => {
    let followersUrl = developer.source.followers_url;
    retrieve(User, followersUrl.split('{')[0], (r) => developer.followers = r,
        success, failure);
};

const retrieveFollowing = (developer, success, failure) => {
    let followingUrl = developer.source.following_url;
    retrieve(User, followingUrl.split('{')[0], (r) => developer.following = r,
        success, failure);
};

const retrieveSubscriptions = (developer, success, failure) => {
    let subscriptionsUrl = developer.source.subscriptions_url;
    retrieve(Subscription, subscriptionsUrl.split('{')[0], (r) => developer.subscriptions = r,
        success, failure);
};

const retrieveMembers = (organization, success, failure) => {
    let membersUrl = organization.source.members_url;
    retrieve(User, membersUrl.split('{')[0], (r) => organization.members = r,
        success, failure);
};

module.exports = {
    endpoint,
    get,
    retrieveRepos,
    retrieveGists,
    retrieveSources,
    retrieveCommits,
    retrieveBranches,
    retrieveTree,
    retrieveEvents,
    retrieveFollowers,
    retrieveFollowing,
    retrieveSubscriptions,
    retrieveMembers
};