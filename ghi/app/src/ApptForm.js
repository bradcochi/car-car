import React, { useEffect, useState } from "react";

function AddAppt() {
  const [technicians, setTechnicians] = useState([]);

  const [vin, setVin] = useState("");
  const handleVinChange = (event) => {
    setVin(event.target.value);
  };

  const [customer, setCustomer] = useState("");
  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const [date_time, setDateTime] = useState("");
  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const [technician, setTechnician] = useState("");
  const handleTechnicianChange = (event) => {
    setTechnician(event.target.value);
  };

  const [reason, setReason] = useState("");
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.vin = vin;
    data.customer = customer;
    data.date_time = date_time;
    data.technician = technician;
    data.reason = reason;

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();

      setVin("");
      setCustomer("");
      setDateTime("");
      setTechnician("");
      setReason("");
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleVinChange}
                value={vin}
                placeholder="Automobile VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCustomerChange}
                value={customer}
                placeholder="Customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDateTimeChange}
                value={date_time}
                placeholder="Date & Time"
                required
                type="datetime-local"
                name="time"
                id="time"
                className="form-control"
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleTechnicianChange}
                value={technician}
                required
                id="technician"
                name="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map((technician) => {
                  return (
                    <option
                      key={technician.employee_id}
                      value={technician.employee_id}
                    >
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleReasonChange}
                value={reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddAppt;
