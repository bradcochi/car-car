import React, { useState } from "react";

function SalespersonForm() {
  const [first_name, setFirstName] = useState("");
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const [last_name, setLastName] = useState("");
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const [employee_id, setEmployeeId] = useState("");
  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.first_name = first_name;
    data.last_name = last_name;
    data.employee_id = employee_id;

    const salespersonUrl = "http://localhost:8090/api/salespeople/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salespersonUrl, fetchConfig);
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmployeeId("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new salesperson!</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={first_name}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={last_name}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEmployeeIdChange}
                value={employee_id}
                placeholder="Employee ID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SalespersonForm;
