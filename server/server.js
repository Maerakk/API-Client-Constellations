const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const routes = require('./routes');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const Path = require('path');
const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient(
    {datasources: {
            db: {
                url: 'file:./prisma/datasource.db'
            }
        }}
);
const {createConstell} = require('./data/Constell_JsonToDb')


// console.log(__dirname)

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


const swaggerOptions = {
    info: {
        title: 'Constellations API Documentation',
        version: '0.0.1'
    },
    debug: true,
    basePath: '/api',
    pathPrefixSize: 2
};



server.route(routes);



exports.start = async () => {
    await createConstell(prisma)
    await server.register([
        inert,
        vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }])

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
