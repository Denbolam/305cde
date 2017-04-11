'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Yar = require('yar');

var config = require('./config');

const server = new Hapi.Server();
server.connection({ port: config.web.port, host: config.web.host });
server.route(require('./api/account'));

require('./api/mongo').setup(server);

server.register([
	{
		register: Good,
		options: {
			reporters: {
				console: [
					{
						module: 'good-squeeze',
						name: 'Squeeze',
						args: [
							{
								response: '*',
								log: '*'
							}
						]
					},
					{
						module: 'good-console'
					},
					'stdout'
				]
			}
		}
	},
	{ register: Inert },
	{
		register: Yar,
		options: {
			storeBlank: false,
			cookieOptions: {
				password: 'the-password-must-be-at-least-32-characters-long',
				isSecure: false,
			}
		}
	}
], (err) => {

	if (err) {
		throw err; // something bad happened loading the plugin
	}

	// index page
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply.file('view/index.html');
		}
	});

	// view folder
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'view'
			}
		}
	});

	server.start((err) => {

		if (err) {
			throw err;
		}
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
