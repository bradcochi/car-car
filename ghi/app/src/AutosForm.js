import React, {useEffect, useState} from 'react';

function AutomobilesForm() {
    const [models, setModels] = useState([]);

    const [color, setColor] = useState('')
    const handleColorChange = (event) => {
        setColor(event.target.value)
    }

    const [year, setYear] = useState('')
    const handleYearChange = (event) => {
        setYear(event.target.value)
    }

    const [vin, setVin] = useState('')
    const handleVinChange = (event) => {
        setVin(event.target.value)
    }

    const [modelID, setModelID] = useState('')
    const handleModelIDChange = (event) => {
        setModelID(event.target.value)
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};
      data.color = color
      data.year = year;
      data.vin = vin
      data.model_id = modelID;

      const automobileUrl = 'http://localhost:8100/api/automobiles/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-type': 'application/json'
          },
      };
      const response = await fetch(automobileUrl, fetchConfig);
      if (response.ok) {
          const newAuto = await response.json();
          console.log(newAuto);

          setColor('')
          setModelID('')
          setYear('')
          setVin('')
      }
    }
    const fetchData = async () => {
      const url = "http://localhost:8100/api/models/";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      }
    };


    useEffect(() => {
      fetchData();
    }, []);

      return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile!</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name='color' id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name='year' id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name='vin' id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange={handleModelIDChange} value={modelID} required id="model_id" name='model_id' className="form-select">
                  <option value="">Choose a model...</option>
                  {models.map(model => {
                    return (
                      <option value={model.id} key={model.id}>
                            {model.name}
                        </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  export default AutomobilesForm;
