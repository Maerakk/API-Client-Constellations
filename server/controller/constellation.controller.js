const constellationDao = require('../dao/constellation.dao.js');
const Hapi = require('@hapi/hapi')

const constellationController = {
    findAllConstellation : async () => {
        return await constellationDao.findAllConstellation();
    }
    ,
    findConstellationById : async (id) => {
        return await constellationDao.findConstellationById(id)
    }
    ,
    addConstellation : async (request) => {
        const playload = {
            id: request.playload.id,
            latinName: request.playload.latinName,
            frenchName: request.playload.frenchName,
            englishName: request.playload.englishName,
            code: request.playload.code,
            season: request.playload.season,
            mainStar: request.playload.mainStar,
            celestialZone: request.playload.celestialZone,
            eclipticZone: request.playload.eclipticZone,
            milkyWayZone: request.playload.milkyWayZone,
            quad: request.playload.quad,
            origin: request.playload.origin,
            Stars: request.playload.Stars
        };
        // if (Object.values(payload).includes(undefined)){
        //     return h.response({error: "request error"}).code(203);}
        //
        // const constell = await constellationDao.findConstellationById(playload.id)
        return playload
        // if (constell != null) {
        //     throw new Error('already exists');
        // }
        // return await constellationDao.addConstellation(constell2add)
    }
    ,
    deleteConstellationById : async (id) => {
        const constell = await constellationDao.deleteConstellationById(id)
        if (constell == null) {
            throw new Error("not found");
        }
        return constell
    },
    deleteConstellations : async () => {
        return await constellationDao.deleteConstellations();
    }

}

module.exports = {constellationController}