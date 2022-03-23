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
    addConstellation : async (payload) => {

        const constell = await constellationDao.findConstellationById(payload.id)
        if (constell != null) {
            throw new Error('already exists');
        }
        else {
            try {
                return await constellationDao.addConstellation(payload)
            }catch(e){
                return e
            }
        }
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