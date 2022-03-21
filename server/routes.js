'usestrict';
const swaggerSpec = require('./start');
const constellationController = require('./controller/constellation.controller').constellationController;
const starsController = require('./controller/star.controller').starController;
const Joi = require('joi');
const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi')
const Prisma = require('prisma/prisma-client');
const Constellation = require("./model/constellation.model");
const prisma = new Prisma.PrismaClient();


// Joi Objects
const schemaConstellations = Joi.object({
    id: Joi.number(),
    latinName: Joi.string(),
    frenchName : Joi.string(),
    englishName : Joi.string(),
    code: Joi.string(),
    season: Joi.string(),
    mainStar: Joi.string(),
    celestialZone: Joi.string(),
    exlipticZone: Joi.string(),
    milkyWayZone: Joi.string(),
    quad: Joi.string(),
    origin: Joi.string(),
    stars: Joi.string()
}).label('Constellations');
schemaConstellations.validate(constellationController.findConstellation);

const schemaStars = Joi.object({
    id: Joi.string(),
    designation: Joi.string(),
    name: Joi.string(),
    constellation: Joi.object(),
    constellationCode: Joi.string(),
    approuvalDate: Joi.string()
}).label('Stars');


module.exports = [
{
    method: 'GET',
    path: '/api',
    options: {
        handler:async (request, h) => {

           return  h.response("hello").header('head','er')
            // return 'hello'
        },
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Good'
                    }
                }
            }
        },
        tags: ['api'],
        description: 'Page de garde',
        notes: 'Renvoie bonjour de hapi'
    }},

    {
    path: '/{any*}',
    method: 'GET',
        options: {
            handler: (request, h) => {
                return Boom.notFound('Ressource not found')
            },
            tags: ['api'],
            description: '404 page',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '404': {
                            'description': 'Page not found'
                        }
                    }
                }
            }
        }
},

{
    path: '/constellations',
    method: 'GET',
    options: {
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Good'
                        //schema : schemaConstellations.default(constellationController.findAllConstellation())

                    }
                }
            }
        },
        tags: ['api'],
        description: 'Get all constellations',
        handler: (request, h,res) => {
            // let ret = JSON.stringify(res);
            // let response=  h.response(ret).header('Access-Control-Allow-Origin', '164.132.225.210:1234')
            //  constellationController.findAllConstellation().then(response =>{
            //      return h.response(response).header('Access-Control-Allow-Origin','164.132.225.210:1234')});
            // reply(constellationController.findAllConstellation()).header('Access-Control-Allow-Origin', '164.132.225.210:1234');
            return constellationController.findAllConstellation();
        },
        notes: 'Renvoie un tableau de constellations'
    }
},

    {
        path: '/constellations/{id}',
        method: 'GET',
        options: {
            handler: (request, h) => {
                const id = parseInt(request.params.id);
                return constellationController.findConstellationById(id);
            },
            description: 'Get one constellation by its id',
            tags: ['api'],
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'Constellation found'
                        }
                    }
                }
            }
        }
    },
    {
        path: '/constellations/add',
        method: 'POST',
        options: {
            handler: async (request, h)  => {
                try {
                    const payload = {
                        id: request.payload.id,
                        latinName: request.payload.latinName,
                        frenchName: request.payload.frenchName,
                        englishName: request.payload.englishName,
                        code: request.payload.code,
                        season: request.payload.season,
                        mainStar: request.payload.mainStar,
                        celestialZone: request.payload.celestialZone,
                        eclipticZone: request.payload.eclipticZone,
                        milkyWayZone: request.payload.milkyWayZone,
                        quad: request.payload.quad,
                        origin: request.payload.origin,
                        stars: request.payload.stars
                    };
                    if (Object.values(payload).includes(undefined)) {
                        return h.response({error: "request error"}).code(203);
                    } else {
                        return constellationController.addConstellation(payload)
                    }
                } catch(error) {
                    // return error
                    return h.response({error: error}).code(203)
                }


            },
            description: 'Add a constellation',
            tags: ['api'],
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'Constellation added successfully'
                        }
                    }
                }
            }
        }
    },
    {
        path: '/constellations/delete/{id}',
        method: 'DELETE',
        handler: (request, h) => {
            const id = parseInt(request.params.id);
            return constellationController.deleteConstellationById(id);
        }
    },
    {
        path: '/constellations/delete',
        method: 'DELETE',
        handler: (request, h) => {
            return constellationController.deleteConstellations();
        }
    },
    {
        path: '/stars',
        method: 'GET',
        handler: (request, h) => {
            return starsController.findAllStars();
        }
    },
    {
        path:'/stars/{id}',
        method: 'GET',
        handler: (request,h)=>{
            const id = request.params.id;
            return starsController.findStarById(id);
        }
    },
    {
        path: '/stars/add/{star}',
        method: 'POST',
        handler: (request,h) => {
            const star = request.params.star
            return starsController.addStar(star);
        }
    },
    {
        path: '/stars/delete/{id}',
        method: 'DELETE',
        handler: (request,h) => {
            const id = request.params.id;
            return starsController.deleteStarById(id);
        }
    },
    {
        path: '/teapot',
        method: 'GET',
        options: {
            handler: (request,h) => {return Boom.teapot()},
            tags: ['api'],
            description: 'I\'m a teapot',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200':{
                            'description' : 'teapot'
                        }
                    }
                }
            }
        }
    }
];