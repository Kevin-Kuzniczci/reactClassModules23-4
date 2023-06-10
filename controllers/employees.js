import Employee from "../models/Employee"

const getAllEmployees = async (req, res) => {
    try {
        const employee = await Employee.find({})
        res.status(200).json({employees, count: employee.length })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getEmployee = async (req, res) => {
    // res.send("Get a single employee")
    try {
        let {id:employeeID} = req.params
        const employee = await Employee.findOne({ _id: id })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeID} found.`})
        }
        res.status(200).json({employee})
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createEmployee = async (req, res) => {
   try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ msg: "Employee added successfully"})
   } catch (err) {
        res.status(500).json({msg: err})
   }
}

const updateEmployee = async (req, res) => {
    try {
        let {id:employeeID} = req.params
        const employee = await Employee.findOneAndUpdate({ _id: employeeID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with the id ${employeeID} was found.`})
        }
        res.status(200).json({ msg: "Successfully updated employee" })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
    res.send("Update an employee")
}

const deleteEmployee = async (req, res) => {
    try {
        let {id:employeeID} = req.params
        const employee = await Employee.findOneAndDelete({ _id: id })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeID} found.`})
        }
        res.status(200).json({ msg: "Employee successfully deleted" })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
    res.send("Delete an employee")
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}