module.exports = class Constellation{
    id
    latinName
    frenchName
    englishName
    code
    season
    mainStar
    celestialZone
    eclipticZone
    milkyWayZone
    quad
    origin
    stars
    constructor(id,latinName,frenchName,englishName,code,season,mainStar,celestialZone,eclipticZone,milkyWayZone,quad,origin,stars) {
        this.id = id;
        this.latinName = latinName;
        this.frenchName = frenchName;
        this.englishName = englishName;
        this.code = code;
        this.season = season;
        this.mainStar = mainStar;
        this.celestialZone = celestialZone;
        this.eclipticZone = eclipticZone;
        this.milkyWayZone = milkyWayZone;
        this.quad = quad;
        this.origin = origin;
        this.stars = stars;
    }
}