import React, { useEffect, useState } from "react";

function CustomersList() {
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <header>
        <h1>Customers</h1>
      </header>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone_number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default CustomersList;
