const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const routes = require('./routes');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const AuthJwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const Path = require('path');

const myKey = '1234';
const users = {
    1: {
        id: 1,
        name: 'Maëlle'
    },
    2: {
        id: 2,
        name: 'Jules'
    }
};


let server = Hapi.server({
    port: 1234,
    host: 'localhost',
    // route pour le client
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'client/')
        }
    }

});


const validate = async function (decoded, request, h) {
    console.log(decoded);
    // do your checks to see if the person is valid
    if (!users[decoded.id]) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};


const swaggerOptions = {
    info: {
        title: 'Constellations API Documentation',
        version: '0.0.1'
    },
    debug: true,
    basePath: '/api',
    pathPrefixSize: 2
};






exports.start = async () => {
    await server.register([
        inert,
        vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        AuthJwt
        ])

    server.auth.strategy('jwt', 'jwt',
        { key: myKey, // Never Share your secret key
            validate  // validate function defined above
        });

    server.route(routes);



// route pour le client

    server.route([{
        //index.html
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                redirectToSlash: false,
            }
        }
    },
        {
            method: 'GET',
            path: '/etoiles/{params*}',
            handler: {
                file: './etoiles.html'
            }
        },
        //src
        {
            method: 'GET',
            path:'/src/{srcFile*}',
            handler:{
                directory: {
                    path:'src/',
                    redirectToSlash:true
                }
            }
        },
        //assets
        {
            method: 'GET',
            path:'/assets/{assetsFile*}',
            handler:{
                directory: {
                    path:'assets/',
                    redirectToSlash: true
                }
            }
        }
    ]);
    await server.start();
    console.log('Server running at:', server.info.uri);

    return server;
    };

exports.init = async () => {
    await server.initialize();

    return server;
};
process.on('unhandledRejection', (err) => {
    console.log(err);
});
