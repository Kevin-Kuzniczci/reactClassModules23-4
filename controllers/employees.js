const getAllEmployees = (req, res) => {
    res.send("Get all employees")
}

const getEmployee = (req, res) => {
    res.send("Get a single employee")
}

const createEmployee = (req, res) => {
    res.send("Create an employee")
}

const updateEmployee = (req, res) => {
    res.send("Update an employee")
}

const deleteEmployee = (req, res) => {
    res.send("Delete an employee")
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}