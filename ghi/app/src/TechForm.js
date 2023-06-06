import React, {useEffect, useState} from 'react';

function AddTech() {


    const [first, setFirst] = useState("")
    const handleFirstChange = (event) => {
        setFirst(event.target.value);
    }

    const [last, setLast] = useState("")
    const handleLastChange = (event) => {
        setLast(event.target.value);
    }

    const [employeeID, setEmployeeID] = useState("")
    const handleEmployeeIDChange = (event) => {
        setEmployeeID(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.first = first
        data.last = last
        data.employeeID = employeeID

        console.log(data)

        const technicianUrl = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
        }
        const response = await fetch(technicianUrl, fetchConfig)
        if (response.ok) {
            const newTech = await response.json()
            console.log(newTech)

            setFirst('');
            setLast('');
            setEmployeeID('');
        }

    }
    const fetchData = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()

        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="row">
         <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={handleFirstChange} value={first} placeholder="First name" required type="text" name='first_name' id="first_name" className="form-control"/>
                <label htmlFor="first_name">First name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLastChange} value={last} placeholder="Last name" required type="text" name='last_name' id="last_name" className="form-control"/>
                <label htmlFor="last_name">Last name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmployeeIDChange} value={employeeID} placeholder="Employee ID" required type="number" name='employee_id' id="employee_id" className="form-control"/>
                <label htmlFor="employee_id">Employee ID</label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default AddTech
