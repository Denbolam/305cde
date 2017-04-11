var Mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var config = require('../config');

var server = null;
exports.setup = function(hapiServer){
    server = hapiServer;
};

Mongoose.connect('mongodb://' + config.mongo.url + ':' + config.mongo.port + '/' + config.mongo.database);
var db = Mongoose.connection;

db.on('error', function(err){
    server.log('error', err);
});
db.once('open', function () {
    server.log('info', 'Connection with database succeeded.');
});

// mongo database for account
var AccountSchema = new Mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
AccountSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    hashField: 'password',
    usernameLowerCase: true,
});

var Account = Mongoose.model('Account', AccountSchema, 'Account');
exports.Account = Account;
