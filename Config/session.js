const mongodbstore = require('connect-mongodb-session');
const expressSession = require('express-session');

function createsessionStore() {
    const MongodbStore = mongodbstore(expressSession);
    const store = new MongodbStore({
        uri: "mongodb://localhost:27017",
        databaseName: 'ShopingWebSiteData',
        collection: 'sessions',
    })
    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createsessionStore(),
        cookie: {
<<<<<<< HEAD
            maxAge: 24 * 60 * 60 * 1000
=======
            maxAge: 60 * 1000
>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
        }
    };
}

module.exports = createSessionConfig;