const mongodb = require('../DataBaseConnection/MongoDbConnection');
const mongodbObjectid = require('mongodb');
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

    EmailValidation() {
        return mongodb.getDb().collection('users').findOne({
            email: this.email
        })
    }
    static async FindByid(userid) {
        const uid = new mongodbObjectid.ObjectId(userid);
        return mongodb.getDb().collection('users').findOne({
            _id: uid
        }, { projection: { password: 0 } })
    }
    async existingemail() {
        const existinguser = await this.EmailValidation();

        if (existinguser) {
            console.log("existingusert", existinguser)
            return true
        } else {
            console.log("existinguserf", existinguser)
            return false
        }

    }
    passwordValidation(decriptpassword) {
        return bcript.compare(this.password, decriptpassword);
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