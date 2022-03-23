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

           // return  h.response("hello").header('head','er')
        },
        tags: ['api'],
        description: 'Page de garde',
        notes: 'Renvoie bonjour de hapi',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Good'
                    }
                }
            }
        }
    }},

    {
    path: '/{any*}',
    method: 'GET',
        options: {
            handler: (request, h) => {
                return Boom.notFound('Route not found')
            },
            tags: ['api'],
            description: '404 Route Not Found',
            notes: 'La route n\'existe pas, veuillez vous référencer à http://localhost:1234/documentation pour connaître les routes disponibles',
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
        handler: async (request, h,res) => {
            const response = await constellationController.findAllConstellation()
            // return h.response(response).header("Access-Control-Allow-Origin","http://127.0.0.1");
        },
        tags: ['api'],
        description: 'Récupérer toutes les constellations',
        notes: 'Renvoie un tableau de toute les constellations',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Good'
                    }
                }
            }
        }
    }
},

    {
        path: '/constellations/{id}',
        method: 'GET',
        options: {
            handler: async (request, h) => {
                const id = request.params.id;
                const response = await constellationController.findConstellationById(id)
                return h.response(response).header("access-control-allow-origin","127.0.0.1");
            },
            description: 'Récupérer une constellation par son code',
            notes: 'Renvoie une constellation sous forme de json. Utiliser le code de la constellation pour l\'id',
            tags: ['api'],
            validate:
                params: Joi.object({
                        id: Joi.string()
                    }),


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
                        // id: request.payload.id,
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
                        const response = await constellationController.addConstellation(payload)
                        if (response==null) {
                            return h.response({error: "request error"}).code(203)
                        }else {
                            return h.response(response).header("access-control-allow-origin", "127.0.0.1").code(201);
                        }
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
        options: {

            handler: (request, h) => {
                const id = parseInt(request.params.id);
                return constellationController.deleteConstellationById(id);
            },
            description: 'Delete a constellation. Delete the stars too !',
            tags: ['api'],
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'Constellation deleted successfully'
                        }
                    }
                }
            }
        }
    }
    ,
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
        path: '/stars/add',
        method: 'POST',
        handler: async (request,h) => {
            try {
                const payload = {
                    id: request.payload.id,
                    designation: request.payload.designation,
                    name: request.payload.name,
                    constellationCode: request.payload.constellationCode,
                    approvalDate: request.payload.approvalDate
                };
                if (Object.values(payload).includes(undefined)) {
                    return h.response({error: "request error"}).code(203);
                } else {
                    const response = await starsController.addStar(payload)
                    if (response==null) {
                        return h.response({error: "request error"}).code(203)
                    }else {
                        return h.response(response).header("access-control-allow-origin", "127.0.0.1").code(201);
                    }
                }
            } catch(error) {
                // return error
                return h.response({error: error}).code(203)
            }
        }
    },
    {
        path: '/stars/delete/{id}',
        method: 'DELETE',
        handler: (request,h) => {
            const id = request.params.id;
            console.log(request.params)
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