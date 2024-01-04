const { getAllAuditActivity } = require("../models/AuditModel");

const getAllAuditActivityService = async () => {
    const data = await getAllAuditActivity();
    const auditWithCustomer = data.auditActivity.map(audit => {
        const customers = data.customers.find(cst => cst.CustomerID === audit.CustomerID);
        const employee = data.employee.find(emp => emp.EmployeeID === audit.EmployeeID);
        return {
            ...audit,
            CustomerName: customers ? customers.CustomerName : "Unknown customer",
            ContactNo1: customers ? customers.ContactNo1 : "Unknown contact",
            Area: customers ? customers.Area : "Area",
            EmployeeName: employee ? employee.ScreenFullName : "Unknown Employee",
        };
    });
    return auditWithCustomer;
};

module.exports = { getAllAuditActivityService }