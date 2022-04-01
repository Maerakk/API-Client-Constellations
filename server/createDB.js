const Prisma = require('prisma/prisma-client');
const prisma = new Prisma.PrismaClient(
    {datasources: {
            db: {
                url: 'file:./datasource.db'
            }
        }}
);
const {createConstell} = require('../data/Constell_JsonToDb')
const {starCreate} = require('../data/Star_JsonToDb')
createConstell(prisma)
starCreate(prisma)
