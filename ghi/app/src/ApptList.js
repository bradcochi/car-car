import React, { useState, useEffect } from "react";

function ApptList() {
  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };
  const autosData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  };
  const updateAppointments = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("appointments", JSON.stringify(data.appointments));
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    } else {
      fetchData();
    }
    autosData();
    updateAppointments();
  }, []);

  const remove = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  function finish(id) {
    fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
      method: "PUT",
    }).then((result) => {
      if (result.ok) {
        remove(id);
      } else {
        result.json().then((resp) => {
          console.warn(resp);
        });
      }
    });
  }
  function cancel(id) {
    fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
      method: "PUT",
    }).then((result) => {
      if (result.ok) {
        remove(id);
      } else {
        result.json().then((resp) => {
          console.warn(resp);
        });
      }
    });
  }

  return (
    <>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {appointments.map((appointment) => {
            const dateTime = new Date(appointment.date_time);
            const apptDate = dateTime.toLocaleDateString();
            const apptTime = dateTime.toLocaleTimeString();

            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>
                  {autos.find(
                    (auto) => auto.vin === appointment.vin && auto.sold
                  ) ? (
                    <span className="text-success">Yes</span>
                  ) : (
                    <span className="text-danger">No</span>
                  )}
                </td>
                <td>{appointment.customer}</td>
                <td>{apptDate}</td>
                <td>{apptTime}</td>
                <td>{appointment.technician} </td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    onClick={() => finish(appointment.id)}
                    type="button"
                    className="btn btn-success"
                  >
                    Finish
                  </button>
                  <button
                    onClick={() => cancel(appointment.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ApptList;
