class Gist {
    constructor(gist) {
        this._gist = gist;
        this._files = {};
    };

    get source() {
        return this._gist;
    }

    get description() {
        return this._gist.description;
    };

    get filesSource() {
        return this._gist.files;
    }

    get files() {
        return this._files;
    }
    
    set files(files) {
        this._files = files;
    }
}

module.exports = Gist;