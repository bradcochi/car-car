import React, {useEffect, useState} from 'react';



function TechsList () {
    const [technicians, setTechnicians] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    // function deleteHat(id) {
    //     fetch(`http://localhost:8090/api/hats/${id}`, {
    //         method: "DELETE"
    //     }).then((result) => {
    //         fetchData()
    //         result.json().then((resp) => {
    //         console.warn(resp)
    //     })
    // })


    return (
        <>
            <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
                <thead>
                    <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    </tr>
                </thead>
                <tbody className="border-top border-dark-subtle">
                    {technicians.map(technician => {

                        return (
                            <tr key={technician.id}>
                                <td>{ technician.employee_id }</td>
                                <td>{ technician.first_name }</td>
                                <td>{ technician.last_name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </>
    )
}
export default TechsList
