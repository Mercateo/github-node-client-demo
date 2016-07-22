class Commit {
    constructor(commit) {
        this._commit = commit;
    };

    get source() {
        return this._commit;
    }

    get message() {
        return this._commit.commit.message;
    };

    get url() {
        return this._commit.url;
    }
}

module.exports = Commit;