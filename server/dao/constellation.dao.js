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
        try {
            const constell = await prisma.constellation.findUnique({where: {code: id}, include: {stars: true}});
            if (constell == null) {
                return null
            } else {
                return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
            }
        }catch(e) {
            console.log(e)
        }

    }
    ,
    addConstellation: async (payload) => {
// return payload
        try {
            const stars = payload.stars;
            const constell = await prisma.constellation.create({
                data: {
                    // id: null,
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
                    stars: {
                        create: []
                    }

                }
            })

                stars.forEach(curStar => {
                    prisma.constellation.findUnique({
                        where: {
                            code: constell.code
                        }
                    })
                .then(constel => {
                        prisma.star.create({
                            data: {
                                id: curStar.id,
                                designation: curStar.designation,
                                name: curStar.name,
                                constellationCode: curStar.constellationCode,
                                approvalDate: curStar.approvalDate
                            }
                        }).then(createdStar => {
                            prisma.constellation.update({
                                where: {
                                    code: createdStar.constellationCode
                                },
                                data: {
                                    stars: {
                                        connect: {
                                            designation: createdStar.designation
                                        }
                                    }
                                }
                            }).then(data => {
                                console.log(data)
                            })
                        })
                    })
                })
            // constell.id,
            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, stars)
        }catch(e) {
            console.log(e)
        }



            },

    deleteConstellationById: async (id) => {
        try {
            const constell = await prisma.constellation.delete({where: {id: id}})
            return new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
        }catch (e) {
            console.log(e);
        }
    }
    ,
    deleteConstellations: async () => {
        return await prisma.constellation.deleteMany({
            where: {
                id: {
                    not: 0
                }

            }
        });
    }

}

module.exports = constellationDao