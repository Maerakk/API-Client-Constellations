const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const routes = require('./routes');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const Path = require('path');



console.log(__dirname)

    const server = Hapi.server({
        port: 1234,
        host: 'localhost',
        // route pour le client
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'client/')
            }
        }

    });


    const swaggerOptions = {
        info: {
            title: 'Constellations API Documentation',
            version: '0.0.1'
        },
        debug: true
    };


server.route(routes);

module.exports = server;
init = async () => {
    await server.initialize();
    return server;

};

start = async () => {
        await server.register([
            inert,
            vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions,
            }
        ]);

        // route pour le client
        server.route([{
            //index.html
            method: 'GET',
            path: '/starFinder/{param*}',
            handler: {
                directory: {
                    path: './',
                    redirectToSlash: false,
                    }
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
process.on('unhandledRejection', (err) => {
    console.log(err);
});
start();

