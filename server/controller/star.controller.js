const starDao = require('../dao/star.dao.js');

const starController = {
    findAllStars : async () => {
        return await starDao.findAllStars();
    }
    ,
    findStarById : async (id) => {
        return await starDao.findStarById(id)
    }
    ,
    addStar : async (star2add) => {
        const star = await starDao.findStarById(star2add.id)
        if (star != null) {
            throw new Error('already exists');
        }
        return await starDao.addStar(star2add)
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