import React, { useEffect, useState } from "react";

function SalespersonHistory() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [salesperson, setSalesperson] = useState();
  console.log(salesperson);

  const filteredSales = sales.filter(
    (sale) => sale.salesperson.id === Number(salesperson)
  );
  console.log({ filteredSales });

  const fetchData = async () => {
    const salespeopleUrl = "http://localhost:8090/api/salespeople/";
    const salespeopleResponse = await fetch(salespeopleUrl);
    if (salespeopleResponse.ok) {
      const data = await salespeopleResponse.json();
      console.log(data.salespeople);
      setSalespeople(data.salespeople);
    }

    const salesUrl = "http://localhost:8090/api/sales/";
    const salesResponse = await fetch(salesUrl);
    if (salesResponse.ok) {
      const data = await salesResponse.json();
      setSales(data.sales);
      console.log(data.sales);
    }
  };

  const handleSalespersonChange = (event) => {
    setSalesperson(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>Salesperson History</h1>
      </header>
      <div className="form-floating mb-3">
        <select
          onChange={handleSalespersonChange}
          placeholder="Salespeople"
          required
          name="salespeople"
          id="salespeople"
          className="form-control"
        >
          <option value="">Choose a salesperson</option>
          {salespeople.map((salesperson) => {
            return (
              <option key={salesperson.id} value={salesperson.id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            );
          })}
        </select>
        <label htmlFor="salespeople">Salesperson</label>
      </div>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {filteredSales.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>
                  {sale.salesperson.first_name} {sale.salesperson.last_name}
                </td>
                <td>
                  {sale.customer.first_name} {sale.customer.last_name}
                </td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
                {/* <td><button onClick={() => deleteSalesperson(salesperson.id)}> Delete </button></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default SalespersonHistory;
