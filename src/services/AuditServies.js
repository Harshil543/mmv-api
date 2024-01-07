const { getAllAuditActivity } = require("../models/AuditModel");

const getAllAuditActivityService = async () => {
    const data = await getAllAuditActivity();
    const auditWithCustomer = data.auditActivity.map(audit => {
        const customers = data.customers.find(cst => cst.CustomerID === audit.CustomerID);
        const employee = data.employee.find(emp => emp.pkID === audit.EmployeeID);
        const city = data.city.find(cty => cty.CityCode === customers.CityCode);
        return {
            ...audit,
            CustomerName: customers ? customers.CustomerName : null,
            ContactNo1: customers ? customers.ContactNo1 : null,
            Area: customers ? customers.Area : null,
            EmployeeName: employee ? employee.EmployeeName : null,
            city: city ? city.CityName : null
        };
    });
    const sectionWithBase = data.section.map((sec) => {
        const rate = data.sectionWithRating.find(rat => rat.ItemOrder === sec.DisplayOrder);
        return {
            ...sec,
            BaseRating: rate ? rate.BaseRating : null,
            Description: rate ? rate.Description : null
        };
    })
    return { auditWithCustomer, section: sectionWithBase };
};

module.exports = { getAllAuditActivityService }