'use strict';
const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {afterEach, beforeEach, describe, it} = exports.lab = Lab.script();
const {init} = require('../server');
describe('GET /', () => {
    let server;
    beforeEach(async () => {
        server = await init();
    });
    afterEach(async () => {
        await server.stop();
    });
    it('/api/v1/brasserie/responds with model', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/v1/brasserie'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.once.include([
            {id: 1, nameBreweries: 'brasserie1', city: 'city1'},
            {id: 2, nameBreweries: 'brasserie1', city: 'city2'}
        ]);
        expect([
            {id: 1, nameBreweries: 'brasserie1', city: 'city1'},
            {id: 2, nameBreweries: 'brasserie1', city: 'city2'}
        ]).to.once.include(res.result);
    });
});