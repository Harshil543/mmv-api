const { getAllAuditActivity, editSectionRating, getSectionBaseRate, FileUpload } = require("../models/AuditModel");

const getAllAuditActivityService = async () => {
    const data = await getAllAuditActivity();
    const auditWithCustomer = data.auditActivity.map(audit => {
        const customers = data.customers.find(cst => cst.CustomerID === audit.CustomerID);
        const employee = data.employee.find(emp => emp.pkID === audit.EmployeeID);
        const city = data.city.find(cty => cty.CityCode === customers.CityCode);
        let scored = []
        const score = data.sectionWithScoreRating.map(ss => { return ss.ParentID === audit.pkID ? scored.push(ss) : "" })
        return {
            ...audit,
            CustomerName: customers ? customers.CustomerName : null,
            ContactNo1: customers ? customers.ContactNo1 : null,
            Area: customers ? customers.Area : null,
            EmployeeName: employee ? employee.EmployeeName : null,
            city: city ? city.CityName : null,
            score: score ? scored : []
        };
    });

    return { auditWithCustomer };
};

const SectionRatingService = async (req, res) => {
    const data = await getSectionBaseRate(req, res);
    const sectionWithBase = data.section.map((sec) => {
        const rate = data.sectionWithBaseRating.find(rat => rat.ItemOrder === sec.DisplayOrder);
        return {
            ...sec,
            BaseRating: rate ? rate.BaseRating : null,
            Description: rate ? rate.Description : null,
            checkListID: rate.pkID
        };
    })
    return sectionWithBase;
};

const editSectionRatingService = async (req, res) => {
    const data = await editSectionRating(req, res);
    return data;
};


const FileService = async (req, res) => {
    const data = await FileUpload(req, res);
    return data;
};


module.exports = { getAllAuditActivityService, editSectionRatingService, SectionRatingService, FileService }