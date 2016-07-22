class Event {
    constructor(event) {
        this._event = event;
    };
    
    get source() {
        return this._event;
    }

    get type() {
        return this._event.type;
    }

    get actor() {
        return this._event.actor.login;
    };

    get repo() {
        return this._event.repo.name;
    }
}

module.exports = Event;