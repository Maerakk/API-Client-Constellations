const Joi = require('joi');

const starsSchema = Joi.object({
    id: Joi.string(),
    designation: Joi.string(),
    name: Joi.string(),
    constellation: Joi.string(),
    constellationCode: Joi.string(),
    approuvalDate: Joi.string()
}).label('Stars');
const starsArraySchema = Joi.array().items(starsSchema.label("Stars")).label("StarsArray");
const constellationsSchema = Joi.object({
    id: Joi.number(),
    latinName: Joi.string(),
    frenchName: Joi.string(),
    englishName: Joi.string(),
    code: Joi.string(),
    season: Joi.string(),
    mainStar: Joi.string(),
    celestialZone: Joi.string(),
    exlipticZone: Joi.string(),
    milkyWayZone: Joi.string(),
    quad: Joi.string(),
    origin: Joi.string(),
    stars: starsArraySchema
}).label("Constellations")
module.exports = {constellationsSchema, starsSchema, starsArraySchema}