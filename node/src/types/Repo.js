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

    get commits() {
        return this._commits;
    };

    set commits(commits) {
        this._commits = commits;
    }
}

module.exports = Repo;