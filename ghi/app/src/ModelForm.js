import React, { useEffect, useState } from "react";

function ModelForm() {
  const [manufacturers, setManufacturers] = useState([]);

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [picture, setPicture] = useState("");
  const handlePictureChange = (event) => {
    setPicture(event.target.value);
  };
  const [manufacturerID, setManufacturerID] = useState("");
  const handleManufacturerIDChange = (event) => {
    setManufacturerID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.name = name;
    data.picture_url = picture;
    data.manufacturer_id = manufacturerID;
    console.log({ manufacturerID });

    const modelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(modelUrl, fetchConfig);
    console.log({ response });
    if (response.ok) {
      const newModel = await response.json();
      console.log(newModel);

      setName("");
      setPicture("");
      setManufacturerID("");
    }
  };

  const fetchData = async () => {
    const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturersUrl);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={picture}
                placeholder="Picture URL"
                required
                type="text"
                name="pictureUrl"
                id="pictureUrl"
                className="form-control"
              />
              <label htmlFor="name">Picture URL</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleManufacturerIDChange}
                value={manufacturerID}
                required
                id="manufacturer"
                name="manufacturer"
                className="form-select"
              >
                <option value="">Choose a Manufacturer</option>
                {manufacturers.map((manufacturer) => {
                  return (
                    <option value={manufacturer.id} key={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ModelForm;
