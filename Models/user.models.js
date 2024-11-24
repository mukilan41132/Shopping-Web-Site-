const mongodb = require('../DataBaseConnection/MongoDbConnection');

const bcript = require('bcryptjs');

class User {
    constructor(email, password, fullname, street, postalcode, city) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.address = {
            street: street,
            postalcode: postalcode,
            city: city
        };
    }
    async Signup() {
        const encriptedPassword = await bcript.hash(this.password, 12);
        await mongodb.getDb().collection('users').insertOne({
            email: this.email,
            password: encriptedPassword,
            fullname: this.fullname,
            address: this.address
        });
    }
}

module.exports = User;