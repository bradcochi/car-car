import React, { useEffect, useState } from "react";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header>
        <h1>Salespeople</h1>
      </header>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {salespeople.map((salesperson) => {
            return (
              <tr key={salesperson.id}>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
                <td>{salesperson.employee_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default SalespeopleList;
