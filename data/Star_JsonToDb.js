const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const constellation = require('../server/model/constellation.model')
const star = require('../server/model/star.model')

const starCreate = async function (){
    await fs.readFile("list-of-iau-approved-star-names-as-of-24112016.json",'utf-8',
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
                                            name:curStar.fields.iau_name
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
starCreate()