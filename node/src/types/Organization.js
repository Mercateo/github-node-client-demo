const Details = require('./Details');

class Organization {
    constructor(org) {
        this._organization = org;

        this._details = new Details(org);
    }

    get source() {
        return this._organization;
    }

    get name() {
        return this._organization.login;
    }

    get type() {
        return this._organization.type;
    }

    get repos() {
        return this._repos;
    }

    set repos(repositories) {
        this._repos = repositories;
    }

    get events() {
        return this._events;
    }

    set events(events) {
        this._events = events;
    }

    get members() {
        return this._members;
    }

    set members(members) {
        this._members = members;
    }

    get details() {
        return this._details;
    }

    set details(details) {
        this._details = details;
    }
}

module.exports = Organization;