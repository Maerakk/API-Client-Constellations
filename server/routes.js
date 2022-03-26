'usestrict';
const swaggerSpec = require('./start');
const constellationController = require('./controller/constellation.controller').constellationController;
const starsController = require('./controller/star.controller').starController;
const joiSchemas = require('./joiSchemas')
const Joi = require('joi');
const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi')
const Prisma = require('prisma/prisma-client');
const Constellation = require("./model/constellation.model");
const prisma = new Prisma.PrismaClient();

const constellationsArraySchema = Joi.array().items(joiSchemas.constellationsSchema.label("Constellations")).label("ConstellationsArray");
// schemaConstellations.validate(constellationController.findAllConstellation);

const starsArraySchema = Joi.array().items(joiSchemas.starsSchema.label("Stars")).label("StarsArray");


module.exports = [
{
    method: 'GET',
    path: '/',
    options: {
        handler:async (request, h) => {
            const response = "Bonjour ! Bienvenue sur notre api de Constellations.\n" +
                "Vous trouverez ici de quoi jouer avec les étoiles et leurs constellations.\n" +
                "Avant de vous lancer veuillez lire la documentation de cette api sur http://localhost:1234/documentation.\n" ;
            return h.response(response)
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
//~~~~~~~~~~~~~~~~~~~~~~~CONSTELLATIONS~~~~~~~~~~~~~~~~~~~~~~~
{
    path: '/constellations',
    method: 'GET',
    options: {
        handler: async (request, h,res) => {
            try {
                const response = await constellationController.findAllConstellation()
                return h.response(response);
            }catch(e){
                console.log(e)
            }
            // return h.response(response).header("Access-Control-Allow-Origin","http://127.0.0.1");
        },
        tags: ['api'],
        description: 'Récupérer toutes les constellations',
        notes: 'Renvoie un tableau de toute les constellations',
        response: {schema: constellationsArraySchema},
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'Good'
                        // content: {
                        //     'json':{
                        //         schema: {
                        //             schemaConstellations
                        //         }
                        //     }
                        // }
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
                return h.response(response);
            },
            description: 'Récupérer une constellation par son code',
            notes: 'Renvoie une constellation sous forme de json. Utiliser le code de la constellation pour l\'id',
            tags: ['api'],
            validate:{
                params: Joi.object({
                        id: Joi.string().min(3).max(3)
                    })},
            response: {
                    schema: joiSchemas.constellationsSchema},


            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'Constellation found',

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
            response: {schema: joiSchemas.constellationsSchema},
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
            response: {schema: joiSchemas.constellationsSchema},
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
        options: {
            handler: (request, h) => {
                return constellationController.deleteConstellations();
            },
            description: 'Supprime toutes les constellations et les étoiles',
            tags: ['api'],
            response: {schema: constellationsArraySchema},
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            description: 'Les constellations ont bien été supprimées'
                        }
                    }
                }
            }
        }
    },
//~~~~~~~~~~~~~~~~~~~~~~~STARS~~~~~~~~~~~~~~~~~~~~~~~
    {
        path: '/stars',
        method: 'GET',
        options: {
            handler: (request, h) => {
                return starsController.findAllStars();
            },
            description: 'Récupérer toutes les étoiles',
            tags: ['api'],
            response: {schema: starsArraySchema},
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'Les étoiles ont été récupérées'
                        }
                    }
                }
            }
        }
    },
    {
        path:'/stars/{id}',
        method: 'GET',
        options: {
            handler: (request, h) => {
                const id = request.params.id;
                return starsController.findStarById(id);
            },
            description: 'Récupère une étoile',
            notes: 'Récupère un tableau de données pour l\'étoile voulue. Choix de l\'étoile par sa désignation',
            tags: ['api'],
            response: {schema: joiSchemas.starsSchema},
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
    },
    {
        path: '/stars/add',
        method: 'POST',
        options: {
            handler: async (request, h) => {
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
                        if (response == null) {
                            return h.response({error: "request error"}).code(203)
                        } else {
                            return h.response(response).header("access-control-allow-origin", "127.0.0.1").code(201);
                        }
                    }
                } catch (error) {
                    // return error
                    return h.response({error: error}).code(203)
                }
            },
            description: 'Ajouter une étoile',
            notes: 'Permet d\'ajouter une étoile',
            tags: ['api'],
            response: {schema: joiSchemas.starsSchema},
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'L\'étoile a été ajoutée'
                        }
                    }
                }
            }
        }
    },
    {
        path: '/stars/delete/{id}',
        method: 'DELETE',
        options: {
            handler: (request, h) => {
                const id = request.params.id;
                console.log(request.params)
                return starsController.deleteStarById(id);
            },
            description: 'Supprimer une étoile',
            notes: 'Permet de supprimer une étoile',
            tags: ['api'],
            response: {schema: joiSchemas.starsSchema},
            plugins: {
                'hapi-swagger':{
                    responses: {
                        '200':{
                            description: 'L\'étoile a été supprimée'
                        }
                    }
                }
            }
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