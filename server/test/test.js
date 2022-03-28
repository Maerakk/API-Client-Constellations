'use strict';
const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = Lab.script();
const {init} = require('../server');
const constellationsDb = require('../database/constellations')


describe('GET /', () => {
    let server
    beforeEach(async () => {
        // await server.initialize();
        // return server;
        server = await init();
    });
    afterEach(async () => {
        await server.stop();
    });
    it('/api/constellations', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/constellations'
        });
        // const constells = (await prisma
        //     .constellation
        //     .findMany({include:{stars:true}})).map(constell => new Constellation(constell.id, constell.latinName, constell.frenchName, constell.englishName, constell.code, constell.season, constell.mainStar, constell.celestialZone, constell.eclipticZone, constell.milkyWayZone, constell.quad, constell.origin, constell.stars));

        expect(res.statusCode).to.equal(200);
        expect(res.result).to.once.include(constellationsDb);
        // expect(constellationsDb).to.once.include(res.result);
        // expect([
        //     {id: 1, nameBreweries: 'brasserie1', city: 'city1'},
        //     {id: 2, nameBreweries: 'brasserie1', city: 'city2'}
        // ]).to.once.include(res.result);
    });
    it('/api/constellations/{id}', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/constellations/1'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.once.include(constellationsDb[0]);
    });
});