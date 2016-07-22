/**
 * Created by alexander on 13.07.16.
 */
class Details {
    constructor(source) {
        this._source = source;
    }

    get source() {
        return this._source;
    }

    get id() {
        return this._source.id;
    }

    get login() {
        return this._source.login;
    }
    
    get name() {
        return this._source.name;
    }

    get type() {
        return this._source.type;
    }

    get company() {
        let company = this._source.company;
        if (company && company.charAt(0) === '@')
            company = company.substring(1);
        return company;
    }

    get created() {
        return new Date(this._source.created_at).toDateString();
    }
    
    get blog() {
        return this._source.blog;
    }
    
    get location() {
        return this._source.location;
    }
    
    get email() {
        return this._source.email;
    }
    
    get numRepos() {
        return this._source.public_repos;
    }

    get numGists() {
        return this._source.public_gists;
    }

    get numFollowers() {
        return this._source.followers;
    }

    get numFollowing() {
        return this._source.following;
    }

    get html() {
        return this._source.html_url;
    }

    get bio() {
        return this._source.bio;
    }

    get description() {
        return this._source.description;
    }

    static addOnExistence(object) {
        let string = '';
        Object.keys(object).forEach((key) => {
            let value = object[key];
            if (value)
                string += `${key}: ${value}\n`;
        });
        return string;
    }

    get pretty() {
        let map = {'Id' : this.id,
            'Name' : this.name,
            'Type' : this.type,
            'Company' : this.company,
            'Created' : this.created,
            'Blog' : this.blog,
            'Location' : this.location,
            'Email' : this.email,
            'Amount Repos' : this.numRepos,
            'Amount Gists' : this.numGists,
            'Amount Followers' : this.numFollowers,
            'Amount Following' : this.numFollowing,
            'Html Url' : this.html,
            'Biography' : this.bio,
            'Description' : this.description
        };
        return Details.addOnExistence(map);
    }
}

module.exports = Details;