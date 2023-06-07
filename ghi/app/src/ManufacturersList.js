import React, { useEffect, useState } from "react";

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  // function deleteSalesperson(id) {
  //     fetch(`http://localhost:8090/api/salespeople/${id}`, {
  //         method: 'DELETE'
  //     }).then((result) => {
  //         fetchData()
  //         result.json().then((resp) => {
  //         console.warn(resp)
  //     })
  // })
  // }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header>
        <h1>Manufacturers</h1>
      </header>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
                {/* <td><button onClick={() => deleteSalesperson(salesperson.id)}> Delete </button></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ManufacturersList;
