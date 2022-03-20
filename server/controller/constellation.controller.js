const constellationDao = require('../dao/constellation.dao.js');

const constellationController = {
    findAllConstellation : async () => {
        return await constellationDao.findAllConstellation();
    }
    ,
    findConstellationById : async (id) => {
        return await constellationDao.findConstellationById(id)
    }
    ,
    addConstellation : async (constell2add) => {
        const constell = await constellationDao.findConstellationById(constell2add.id)
        if (constell != null) {
            throw new Error('already exists');
        }
        return await constellationDao.addConstellation(constell2add)
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