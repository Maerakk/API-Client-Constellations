'use strict';

const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient();

const Star = require('../model/star.model');

const starDao = {

    findAllStars: async () => (await prisma
        .star
        .findMany({include:{constellation:true}})).map(star => new Star(star.id, star.designation, star.name, star.constellation, star.constellationCode, star.approvalDate))
    ,

    findStarById: async (id) => {
        const star = await prisma.star.findUnique({where: {designation: id}});
        console.log(star)
        if (star==null){
            return null
        }
        else {
            return  new Star(star.id, star.designation, star.name, star.constellation, star.constellationCode, star.approvalDate)
        }

    }
    ,

    deleteStarById: async (id) => {
            const star = await prisma.star.delete({where: {designation: id}});
            return new Star(star.id, star.designation, star.name, star.constellation, star.constellationCode, star.approvalDate);

    }
    ,
    deleteStars: async () => await prisma.star.deleteMany()
    ,
    addStar: async (star2add) => {
        const star = await prisma.star.create({
            data: {
                id : star2add.id,
                designation : star2add.designation,
                name : star2add.name,
                constellation: star2add.constellation,
                constellationCode : star2add.constellationCode,
                approvalDate : star2add.approvalDate
            }
        })
        return new Star(star.id, star.designation, star.name, star.constellation, star.constellationCode, star.approvalDate)
    }

};

module.exports = starDao