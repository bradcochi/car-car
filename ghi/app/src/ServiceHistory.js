import React, {useState, useEffect} from "react";

function ServiceHistory() {
    const[appointments, setAppointments] = useState([])

    const [query, setQuery] = useState("")
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div>
                {/* <label htmlFor="search">Search by VIN</label> */}
            </div>
            <div className="my-5">
                <input placeholder="Search VIN" onChange={handleQueryChange} />
                {
                    query && appointments.filter(appointment => {
                        if (query === '') {
                        return appointment;
                        } else if (appointment.vin.toLowerCase().includes(query.toLowerCase())) {
                        return appointment;
                        }
                    }).map((appointment, vin) => (
                        <div className="box" key={vin}>
                        <p>{appointment.vin}</p>

                        </div>
                    ))
                }
                <button onClick={() => []} type="button" className="btn btn-dark">Search</button>
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
                        {appointments.map(appointment => {
                            const dateTime = new Date(appointment.date_time)
                            const date = dateTime.toLocaleDateString()
                            const time = dateTime.toLocaleTimeString()

                            return (
                                <tr key={appointment.href}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.isVIP }</td>
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
export default ServiceHistory
