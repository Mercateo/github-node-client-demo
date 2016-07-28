class Repo {
    constructor(repo) {
        this._repo = repo;
    };
    
    get source() {
        return this._repo;
    }

    get name() {
        return this._repo.name;
    }

    get owner() {
        return this._repo.owner.login;
    }

    get commits() {
        return this._commits;
    };

    set commits(commits) {
        this._commits = commits;
    }

    get branches() {
        return this._branches;
    };

    set branches(branches) {
        this._branches = branches;
    }

    get contributors() {
        return this._contributors;
    }

    set contributors(contributors) {
        this._contributors = contributors;
    }

    get events() {
        return this._events;
    }

    set events(events) {
        this._events = events;
    }

    get details() {
        return this._details;
    }

    set details(details) {
        this._details = details;
    }
}

module.exports = Repo;