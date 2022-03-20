module.exports= class Star{
    id
    designation
    name
    constellation
    constellationCode
    approvalDate
    constructor(id,designation,name,constellation,constellationCode,approvalDate) {
        this.id = id;
        this.designation = designation;
        this.name = name;
        this.constellation = constellation;
        this.constellationCode = constellationCode;
        this.approvalDate = approvalDate;
    }
}