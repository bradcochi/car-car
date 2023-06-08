import React, { useState, useEffect } from "react";

function ServiceHistory() {
    const[appointments, setAppointments] = useState([])
    const[autos, setAutos] = useState([])

    const [search, setSearch] = useState('')
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }


    const [query, setQuery] = useState("")
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

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
    }

    useEffect(() => {
        fetchData();
        autosData();

    }, []);
    return (
        <>

            <div className="my-5">
                <input type="search" placeholder="Search VIN" onChange={handleSearchChange}/>
            </div>

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
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="border-top border-dark-subtle">
                        {appointments.filter((appointment) => {
                            return search.toLowerCase() === '' ? appointment : appointment.vin.toLowerCase().includes(search)
                        }).map(appointment => {
                            const dateTime = new Date(appointment.date_time)
                            const date = dateTime.toLocaleDateString()
                            const time = dateTime.toLocaleTimeString()

                            return (
                                <tr key={appointment.id}>
                                    <td>{ appointment.vin }</td>
                                    <td>
                                    {autos.find((auto) => auto.vin === appointment.vin && auto.sold) ? (
                                        <span className="text-success">Yes</span>
                                    ) : (
                                        <span className="text-danger">No</span>
                                    )}
                                    </td>
                                    <td>{ appointment.customer }</td>
                                    <td>{ date }</td>
                                    <td>{ time }</td>
                                    <td>{ appointment.technician } </td>
                                    <td>{ appointment.reason }</td>
                                    <td>
                                        {appointment.status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </>
    )
}
export default ServiceHistory;
