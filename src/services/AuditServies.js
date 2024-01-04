const { getAllAuditActivity } = require("../models/AuditModel");

const getAllAuditActivityService = async () => {
    const data = await getAllAuditActivity();
    const auditWithCustomer = data.auditActivity.map(audit => {
        const customers = data.customers.find(cst => cst.CustomerID === audit.CustomerID);
        const employee = data.employee.find(emp => emp.EmployeeID === audit.EmployeeID);
        const city = data.city.find(cty => cty.CityCode === customers.CityCode);
        return {
            ...audit,
            CustomerName: customers ? customers.CustomerName : null,
            ContactNo1: customers ? customers.ContactNo1 : null,
            Area: customers ? customers.Area : null,
            EmployeeName: employee ? employee.ScreenFullName : null,
            city: city ? city.CityName : null
        };
    });
    return auditWithCustomer;
};

module.exports = { getAllAuditActivityService }