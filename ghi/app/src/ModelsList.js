import React, { useEffect, useState } from "react";

function ModelsList() {
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
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
        <h1>Models</h1>
      </header>
      <table className="table table-hover table-secondary table-striped border border-dark-subtle shadow container-fluid mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody className="border-top border-dark-subtle">
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer["name"]}</td>
                <td>
                  <img
                    className="img-fluid img-thumbnail"
                    src={model.picture_url}
                  ></img>
                </td>
                {/* <td><button onClick={() => deleteSalesperson(salesperson.id)}> Delete </button></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ModelsList;
