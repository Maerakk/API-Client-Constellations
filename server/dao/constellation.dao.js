'use strict';

const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();

const Constellation = require('../model/constellation.model');

const constellationDao = {

    findAllConstellation: async () => (await prisma
            .constellation
            .findMany({include:{stars:true}})).map(constell => new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.Stars))
    ,

    findConstellationById: async (id) => {
        const constell = await prisma.constellation.findUnique({where: {id: id}, include: {stars:true}});
        if (constell == null) {
            return null
        }
        else {
            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
            }

    }
    ,
    addConstellation: async (payload) => {
// return payload
                const constell = await prisma.constellation.create({
                    data: {
                        id: payload.id,
                        latinName: payload.latinName,
                        frenchName: payload.frenchName,
                        englishName: payload.englishName,
                        code: payload.code,
                        season: payload.season,
                        mainStar: payload.mainStar,
                        celestialZone: payload.celestialZone,
                        eclipticZone: payload.eclipticZone,
                        milkyWayZone: payload.milkyWayZone,
                        quad: payload.quad,
                        origin: payload.origin,
                        stars: payload.stars
                    }
                })


            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
    },

    deleteConstellationById: async (id) => {
        try {
            const constell = await prisma.constellation.delete({where: {id: id}})
            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
        }catch (e) {
            console.log(e);
        }
    },
    deleteConstellationWithStarsById: async (id) => {
        try  {
            return await prisma.constellation.update({
                where: {id: id},
                data: {stars: {delete: true}}
            })
        }catch (e) {
            console.log(e);
        }

    }
    ,
    deleteConstellations: async () => {
        return await prisma.constellation.deleteMany({
            where: {
                id: {
                    not: null
                }

            }
        });
    }

}

module.exports = constellationDao