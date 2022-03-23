const starDao = require('../dao/star.dao.js');

const starController = {
    findAllStars : async () => {
        return await starDao.findAllStars();
    }
    ,
    findStarById : async (id) => {
        try {
            return await starDao.findStarById(id)
        }catch(e) {
            console.log(e)
        }
    }
    ,
    addStar : async (payload) => {
        try {
            const star = await starDao.findStarById(payload.designation)
            if (star != null) {
                throw new Error('already exists');
            }
            return await starDao.addStar(payload)
        }catch(e) {
            console.log(e)
        }
    }
    ,
    deleteStarById : async (id) => {
        const star = await starDao.deleteStarById(id)
        if (star == null) {
            throw new Error("not found");
        }
        return star
    }

}

module.exports = {starController}