var Joi = require('joi');
var Mongo = require('./mongo');
var Account = Mongo.Account;

module.exports = [
    {
        method: 'POST',
        path: '/api/account/register',
        config: {
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            var newAccount = new Account({
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                email: request.payload.email,
            });
            Account.findOne({ email: request.payload.email }, function(err, account){
                if(err){
                    server.log('error', err);
                    reply({ success: false, error: err.message });
                }else if(account){
                    reply({ success: false, error: 'Email is already registered.' });
                }else{
                    Account.register(newAccount, request.payload.password, function (err, account) {
                        if (err) {
                            server.log('error', err);
                            reply({ success: false, error: err.message });
                        } else {
                            request.yar.set('account', account);
                            reply({ success: true, account: account });
                        }
                    });
                }
            })
        }
    },
    {
        method: 'POST',
        path: '/api/account/login',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            Account.authenticate()(request.payload.email, request.payload.password, function (err, account, passwordError) {
                if (err) {
                    server.log('error', err);
                    reply({ success: false, error: err.message });
                } else {
                    if (passwordError) {
                        reply({ success: false, error: passwordError.message });

                    } else if (account) {
                        request.yar.set('account', account);
                        reply({ success: true, account: account });
                    }
                }
            });
        }
    },
    {
        method: 'POST',
        path: '/api/account/logout',
        handler: function (request, reply) {
            request.yar.set('account', null);
            reply({ success: true });
        }
    },
    {
        method: 'GET',
        path: '/api/account/info',
        handler: function (request, reply) {
            var account = request.yar.get('account');
            if (account) {
                reply({ success: true, account: account });
            } else {
                reply({ success: false, account: null });
            }
        }
    }
    /*
{
        method: 'POST',
        path: '/api/account/Change-password',
        handler: function (request, reply) {
          var account = request.yar,get('account');
          Account.findOne({ email: request.payload.email }, function(err, account){
            if (err) {
              server.log('error', err);
              reply({ success: false, error: err.message });
            } else {
              Account.password = request.payload.newPassword || Account.password;
              Account.save(function (err, account) {
                reply("Hello World");
                //reply({ success:true, account:account.withoutPassword()});
              });
            }
          });
        }*/
];
