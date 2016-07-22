const Details = require('./Details');

class User {
    constructor(user) {
        this._user = user;

        this._details = new Details(user);
    }

    get source() {
        return this._user;
    }

    get name() {
        return this._details.login;
    }

    get type() {
        return this._details.type;
    }
    
    get repos() {
        return this._repos;
    }

    set repos(repositories) {
        this._repos = repositories;
    }

    get gists() {
        return this._gists;
    }

    set gists(gists) {
        this._gists = gists;
    }

    get events() {
        return this._events;
    }

    set events(events) {
        this._events = events;
    }
    
    get followers() {
        return this._followers;
    }
    
    set followers(followers) {
        this._followers = followers;
    }

    get following() {
        return this._following;
    }

    set following(following) {
        this._following = following;
    }

    get subscriptions() {
        return this._subscriptions;
    }

    set subscriptions(subscriptions) {
        this._subscriptions = subscriptions;
    }

    get details() {
        return this._details;
    }

    set details(details) {
        this._details = details;
    }
}

module.exports = User;