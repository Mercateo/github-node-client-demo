/**
 * Created by alexander on 13.07.16.
 */
class Subscription {
    constructor (subscription) {
        this._subscription = subscription;
    }

    get source() {
        return this._subscription;
    }

    get name() {
        return this._subscription.name;
    }

    get owner() {
        return this._subscription.owner.login;
    }
}

module.exports = Subscription;