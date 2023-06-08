import React, { useEffect, useState } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
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
        <h1>Sales</h1>
      </header>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {sales.map((sale) => {
            return (
              <tr key={sales.id}>
                <td>{sale.first_name}</td>
                <td>{sale.last_name}</td>
                <td>{sale.salesperson}</td>
                <td>{sale.vin}</td>
                {/* <td><button onClick={() => deleteSalesperson(salesperson.id)}> Delete </button></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default SalesList;
