/**
 * Created by alexander on 13.07.16.
 */
class Branch {
    constructor(branch) {
        this._branch = branch;
    };

    get source() {
        return this._branch;
    }

    get name() {
        return this._branch.name;
    }
}

module.exports = Branch;