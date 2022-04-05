const Joi = require('joi');

const starsSchema = Joi.object({
    id: Joi.string(),
    designation: Joi.string(),
    name: Joi.string(),
    constellationCode: Joi.string(),
    approvalDate: Joi.string()
}).label('Stars');
const starsArraySchema = Joi.array().items(starsSchema.label("Stars")).label("StarsArray");
const constellationsSchema = Joi.object({
    latinName: Joi.string(),
    frenchName: Joi.string(),
    englishName: Joi.string(),
    code: Joi.string(),
    season: Joi.string(),
    mainStar: Joi.string(),
    celestialZone: Joi.string(),
    eclipticZone: Joi.string(),
    milkyWayZone: Joi.string(),
    quad: Joi.string(),
    origin: Joi.string(),
    stars: starsArraySchema
}).label("Constellations")
module.exports = {constellationsSchema, starsSchema, starsArraySchema}