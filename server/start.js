const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const routes = require('./routes');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');


    const server = Hapi.server({
        port: 8080,
        host: '164.132.225.210'
    });


    const swaggerOptions = {
        info: {
            title: 'Constellations API Documentation',
            version: '0.0.1'
        },
        debug: true
    };

    // const plugins = [
    //     inert,
    //     vision,
    //     {
    //         plugin: HapiSwagger,
    //         options: swaggerOptions //https://github.com/glennjones/hapi-swagger/blob/HEAD/optionsreference.md
    //     }
    // ];

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
                options: swaggerOptions
            }
        ]);


            await server.start();
            console.log('Server running at:', server.info.uri);

        return server;
    };
start();

