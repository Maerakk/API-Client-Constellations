const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const constellation = require('../server/model/constellation.model')
const star = require('../server/model/star.model')

const createConstell = async function (){
    await fs.readFile("data/88-constellations.json",'utf-8',
        async (err, data) => {
            if(err){
                console.log(err);
            }else{
                data = JSON.parse(data)
                data.forEach(function(constell){
                     prisma.constellation.create( {
                        data:{
                            latinName       : constell.fields.latin_name_nom_latin,
                            frenchName      : constell.fields.french_name_nom_francais,
                            englishName     : constell.fields.english_name_nom_en_anglais,
                            code            : constell.fields.iau_code,
                            season          : constell.fields.season_saison,
                            mainStar        : constell.fields.principal_star_etoile_principale,
                            celestialZone   : constell.fields.constellation_zone_celestial_equator_zone_de_la_constellation_equateur_celeste,
                            eclipticZone    : constell.fields.constellation_zone_ecliptic_zone_de_la_constellation_ecliptique,
                            milkyWayZone    : typeof constell.fields.constellation_zone_milky_way_zone_de_la_constellation_voie_lactee == 'undefined'? null : constell.fields.constellation_zone_milky_way_zone_de_la_constellation_voie_lactee ,
                            quad            : constell.fields.quad_repere_de_l_hemisphere_et_du_quadrant,
                            origin          : constell.fields.name_origin_origine_de_l_apellation,
                            stars:{
                                create:[]
                            }
                        }
                    }).then(data=>{console.log(data)}).catch(error => {console.log(error)});
                })
            }

        })
}

createConstell()