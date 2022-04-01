const fs = require('fs')
const constellation = require('../server/model/constellation.model')
const star = require('../server/model/star.model')

exports.starCreate = async function (prisma){
    await fs.readFile("data/list-of-iau-approved-star-names-as-of-24112016.json",'utf-8',
        async  (err,data)=>{
            if(err){
                console.log(err);
            }else{
                data = JSON.parse(data);
                data.forEach(curStar=>{
                    prisma.constellation.findUnique({
                        where:{
                            code: curStar.fields.constellation
                        }
                    }).then(constel=>{
                        prisma.star.create({
                            data:{
                                id:curStar.fields.id,
                                designation:curStar.fields.designation,
                                name:curStar.fields.iau_name,
                                constellationCode: curStar.fields.constellation,
                                approvalDate: curStar.fields.approval_date
                            }
                        }).then(createdStar=>{
                            console.log(createdStar)
                            prisma.constellation.update({
                                where:{
                                    code:createdStar.contellationCode
                                },
                                data:{
                                    stars:{
                                        connect:{
                                            designation:createdStar.designation
                                        }
                                    }
                                }
                            }).then(data=>{
                                console.log(data)
                            })
                        })
                    })
                })
            }
        }
    )
}