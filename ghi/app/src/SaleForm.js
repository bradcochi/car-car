import React, { useEffect, useState } from "react";

function SaleForm() {
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [automobile, setAutomobile] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState("");

  const fetchData = async () => {
    const salespeopleUrl = "http://localhost:8090/api/salespeople/";
    const salespeopleResponse = await fetch(salespeopleUrl);
    if (salespeopleResponse.ok) {
      const data = await salespeopleResponse.json();
      setSalespeople(data.salespeople);
    }

    const customerUrl = "http://localhost:8090/api/customers/";
    const customerResponse = await fetch(customerUrl);
    if (customerResponse.ok) {
      const data = await customerResponse.json();
      setCustomers(data.customers);
    }

    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const automobileResponse = await fetch(automobileUrl);
    if (automobileResponse.ok) {
      const data = await automobileResponse.json();
      const filteredAutomobiles = data.autos.filter(
        (automobile) => automobile.sold === false
      );
      setAutomobiles(filteredAutomobiles);
    }
  };

  const handleAutomobileChange = (event) => {
    setAutomobile(event.target.value);
  };

  const handleSalespersonChange = (event) => {
    setSalesperson(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const foundAutomobile = automobiles.find(
      (thisAutomobile) => thisAutomobile.id === Number(automobile)
    );
    console.log({ foundAutomobile });
    console.log({ automobiles });
    console.log({ automobile });
    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;

    const salesUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesUrl, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();

      setAutomobile("");
      setSalesperson("");
      setCustomer("");
      setPrice("");
    }

    const automobilesUrl = `http://localhost:8100/api/automobiles/${foundAutomobile.vin}/`;
    const automobilesFetchConfig = {
      method: "put",
      body: JSON.stringify({ sold: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(automobilesUrl, automobilesFetchConfig);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sale!</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <select
                value={automobile}
                onChange={handleAutomobileChange}
                placeholder="Automobiles"
                required
                name="automobiles"
                id="automobiles"
                className="form-control"
              >
                <option value="">Choose an automobile VIN</option>
                {automobiles.map((automobile) => {
                  return (
                    <option key={automobile.id} value={automobile.id}>
                      {automobile.vin}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="automobiles">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={salesperson}
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
            <div className="form-floating mb-3">
              <select
                value={customer}
                onChange={handleCustomerChange}
                placeholder="Customer"
                required
                name="customers"
                id="customers"
                className="form-control"
              >
                <option value="">Choose a customer</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="customers">Customer</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePriceChange}
                value={price}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SaleForm;
