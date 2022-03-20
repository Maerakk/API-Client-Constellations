'use strict';

const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();

const Constellation = require('../model/constellation.model');

const constellationDao = {

    findAllConstellation: async () => (await prisma
            .constellation
            .findMany()).map(constell => new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.Stars))
    ,

    findConstellationById: async (id) => {
        const constell = await prisma.constellation.findUnique({where: {id: id}});
        if (constell == null) {
            return null
        }
        else {
            // return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
            return constell
            }

    }
    ,
    addConstellation: async (constell2add) => {
        return await prisma.constellation.create({
            data: {
                id: constell2add.id,
                latinName: constell2add.latinName,
                frenchName: constell2add.frenchName,
                englishName: constell2add.englishName,
                code: constell2add.code,
                season: constell2add.season,
                mainStar: constell2add.mainStar,
                celestialZone: constell2add.celestialZone,
                eclipticZone: constell2add.eclipticZone,
                milkyWayZone: constell2add.milkyWayZone,
                quad: constell2add.quad,
                origin: constell2add.origin,
                stars: constell2add.stars
            }
        })
    },

    deleteConstellationById: async (id) => {
        try {
            const constell = await prisma.constellation.delete({where: {id: id}})
            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.Stars)
        }catch (e) {
            return null;
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