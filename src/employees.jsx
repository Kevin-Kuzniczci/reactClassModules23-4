import { response } from "express";

class EmployeeFilter extends React.Component {
    render() {
        return(<div>This is a placeholder for the employee filter.</div>)
    }
};

function EmployeeTable(props){
    const employeeRows = props.employees.map(employee =>
        <EmployeeRow 
        key={employee._id} 
        employee={employee}
        deleteEmployee={props.deleteEmployee} />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th>A</th>
                </tr>
            </thead>

            <tbody>
                {employeeRows}
            </tbody>
        </table>
    )
};

function EmployeeRow(props) {
    function onDeleteClick() {
        props.deleteEmployee(props.employee._id)
    }
    return(
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.datedHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? "Yes" : "No"}</td>
            <td><button onClick={onDeleteClick}>Delete</button></td>
        </tr>
    )
};

class EmployeeAdd extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const form = document.forms.employeeAdd
        const employee = {
            name: form.name.value,
            extension: form.ext.value,
            email: form.email.value,
            title: form.title.value
        }
        this.props.createEmployee(employee)
        form.name.value=""
        form.ext.value=""
        form.email.value=""
        form.title.value=""
    }

    render() {
        return (
            <form name="employeeAdd" onSubmit={this.handleSubmit}>
                Name: <input type="text" name="name" /><br/>
                Extension: <input type="text" name="ext" maxLength={4} /><br />
                Email: <input type="text" name="email" /><br />
                Title: <input type="text" name="title" /><br />
                <button>Add</button>
            </form>
        )
    }
};

class Employeelist extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    };

    componentDidMount() {
        this.loadData()
    };

    loadData() {
        fetch("/api/employees")
        .then(response => response.json())
        .then(data => {
            console.log("Total count of employees:", data.count)
            data.employees.forEach(employee => {
                employee.datedHired = new Date(employee.datedHired)
            })
            this.setState({ employees: data.employees })
        })
        .catch(err => {console.log(err)})
    };

    createEmployee(employee) {
        fetch("/api/employees", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(employee),
        })
        .then(response => response.json())
        .then(newEmployee => {
            newEmployee.employee.datedHired = new Date(newEmployee.employee.datedHired)
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({ employees: newEmployees })
            console.log("Total count of employees:", newEmployees.length)
        })
        .catch(err => {console.log(err)})
    };

    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, {method: "Delete"})
        .then(response => {
            if (!response.ok) {
                console.log("Failed to delete employee.")
            } else {
                this.loadData()
            }
        })
    }
    render() {
        return (
            <React.Fragment>
                    <h1>Employee Management Application</h1>
                    <EmployeeFilter />
                    <hr />
                    <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
                    <hr />
                    <EmployeeAdd createEmployee={this.createEmployee} />
            </React.Fragment>
        )
    }
};

ReactDOM.render(
    <React.StrictMode>
        <Employeelist />
    </React.StrictMode>, 
    document.getElementById("content")
);