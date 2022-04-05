'use strict';
const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = Lab.script();
const {init} = require('../server');
const Constellation = require('../model/constellation.model')
const Star = require('../model/star.model')
const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient({
    datasources: {
        db: {
            url: 'file:./datasourcetest.db'
        }
    }
});
// const {createConstell} = require('../../data/Constell_JsonToDb')
// const {starCreate} = require('../../data/Star_JsonToDb')
// createConstell(prisma)
// starCreate(prisma)


describe('GET /', () => {
    let server
    let auth = null
    beforeEach(async () => {
        server = await init();
        it('/api/auth/1/maëlle', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/api/auth/1/maëlle'
            });
            auth = res;
        });
    });
    afterEach(async () => {
        await server.stop();
    });
    it('/{any*}', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/any'
        });
        expect(res.statusCode).to.equal(404);
        expect(res.result).to.equal(
            {
                "statusCode": 404,
                "error": "Not Found",
                "message": "Not Found"
            }
        )
    });

    //~~~~~~~~~~~~~~~~~~~~~~~CONSTELLATIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    it('/api/constellations', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/constellations'
        });
        const constells = (await prisma
            .constellation
            .findMany({include:{stars:true}})).map(constell => new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars));

        expect(res.statusCode).to.equal(200);
        expect(res.result).to.once.include(constells);
    });
    it('/api/constellations/ URL non gérée', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/constellations/'
        });
        expect(res.statusCode).to.equal(404);
        expect(res.result).to.equal(
            {
                "statusCode": 404,
                "error": "Not Found",
                "message": "Not Found"
            }
        )
    });
    it('/api/constellations/{id}', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/api/constellations/Cam'
        });
        const constell = await prisma.constellation.findUnique({where: {code: "Cam"}, include: {stars: true}});
        const con = new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars)
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.equal(constell);
    });
    it('/api/constellations/{id qui n\'existe pas}', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/constellations/abc'
        });
        expect(res.statusCode).to.equal(404)
        expect(res.result).to.equal({
            "statusCode": 404,
            "error": "Not Found",
            "message": "Not Found"
        });
    })
    //~~~~~~~~~~~~~~~~~~~~~~~STARS~~~~~~~~~~~~~~~~~~~~~~~
    it('/api/stars', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/stars'
        });
        const star = (await prisma
            .star
            .findMany({include:{constellation:true}})).map(star => new Star(star.id, star.designation, star.name, star.constellation, star.constellationCode, star.approvalDate))

        expect(res.statusCode).to.equal(200);
        expect(res.result).to.once.include(star);
    });
    it('/api/stars/ URL non gérée', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/stars/'
        });
        expect(res.statusCode).to.equal(404);
        expect(res.result).to.equal(
            {
                "statusCode": 404,
                "error": "Not Found",
                "message": "Not Found"
            }
        )
    });
    it('/api/stars/{id}', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/api/stars/HR 2845'
        });
        const id = 'HR 2845'
        const starprisma = await prisma.star.findUnique({where: {designation: id}});
        const star= new Star(starprisma.id, starprisma.designation, starprisma.name, starprisma.constellation, starprisma.constellationCode, starprisma.approvalDate)
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.equal(star);
    });
    it('/api/stars/{id qui n\'existe pas}', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/stars/abc'
        });
        expect(res.statusCode).to.equal(404)
        expect(res.result).to.equal({
            "statusCode": 404,
            "error": "Not Found",
            "message": "Not Found"
        });
    });

});

describe('POST /', () => {
    let server
    beforeEach(async () => {
        server = await init();
    });
    afterEach(async () => {
        await server.stop();
    });
    it('/{any*}', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/any'
        });
        expect(res.statusCode).to.equal(404);
        expect(res.result).to.equal(
            {
                "statusCode": 404,
                "error": "Not Found",
                "message": "Not Found"
            }
        )
    });
    it('/api/constellations/add ', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/constellations/add',
            payload: {
                "latinName": "test",
                "frenchName": "test",
                "englishName": "test",
                "code": "test",
                "season": "test",
                "mainStar": "test",
                "celestialZone": "test",
                "eclipticZone": "test",
                "milkyWayZone": "test",
                "quad": "test",
                "origin": "test",
                "stars": [
                    {
                        "designation": "test",
                        "name": "test",
                        "constellation": "test",
                        "constellationCode": "test",
                        "approvalDate": "test"
                    }
                ]
            }
        });
        expect(res.statusCode).to.equal(201);
        expect(res.result).to.equal({
            "latinName": "test",
            "frenchName": "test",
            "englishName": "test",
            "code": "test",
            "season": "test",
            "mainStar": "test",
            "celestialZone": "test",
            "eclipticZone": "test",
            "milkyWayZone": "test",
            "quad": "test",
            "origin": "test",
            "stars": [
                {
                    "designation": "test",
                    "name": "test",
                    "constellation": "test",
                    "constellationCode": "test",
                    "approvalDate": "test"
                }
            ]
        });
    });
    it('/api/constellations/add already exists ', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/constellations/add',
            payload: {
                "latinName": "Cam",
                "frenchName": "Caméra",
                "englishName": "Camera",
                "code": "Cam",
                "season": "Summer",
                "mainStar": "HR 1899",
                "celestialZone": "Celestial",
                "eclipticZone": "Ecliptic",
                "milkyWayZone": "Milky Way",
                "quad": "Quadrant",
                "origin": "Origin",
                "stars": [
                    {
                        "designation": "HR 1899",
                        "name": "Caméra",
                        "constellationCode": "Cam",
                        "approvalDate": "2019-01-01"
                    }
                ]
            }
        });
        expect(res.statusCode).to.equal(400);
        expect(res.result).to.equal({
            "statusCode": 400,
            "error": "Bad Request",
            "message": "Requête erronée, regarder la doc pour vérifier la syntaxe"
        });
    });

});

describe('DELETE /', () => {
    let server
    beforeEach(async () => {
        server = await init();
    });
    afterEach(async () => {
        await server.stop();
    });
    it('/{any*}', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/any'
        });
        expect(res.statusCode).to.equal(404);
        expect(res.result).to.equal(
            {
                "statusCode": 404,
                "error": "Not Found",
                "message": "Not Found"
            }
        )
    });
    it('/api/constellations/delete/{id}', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/constellations/delete/1'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.equal({
            "statusCode": 200,
            "message": "Constellation deleted"
        });
    });
    it('/api/constellations/delete/name/{id}', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/constellations/delete/name/Car'
        });
        expect(res.statusCode).to.equal(200);
        const resulteExpected = new Constellation(96,"Carina","Carène","Keel","Car", "Southern hemisphere constellation / Constellation de l'hémisphère su", "Canopus", "South constellation", "South ecliptic constellation", "Milky Way Equator", "South Hemisphere Quadrant 2", "Lacaille", undefined);


        expect(res.result).to.equal(resulteExpected);
    });

});