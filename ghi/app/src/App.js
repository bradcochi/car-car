import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AddTech from "./TechForm";
import SalespersonForm from "./SalespersonForm";
import SalespeopleList from "./SalespeopleList";
import CustomerForm from "./CustomerForm";
import CustomersList from "./CustomersList";
import ManufacturersList from "./ManufacturersList";
import ManufacturerForm from "./ManufacturerForm";
import ModelsList from "./ModelsList";
import ListTechs from './ListTech';
import ListAppts from './ListAppts';
import AddAppt from './ApptForm';
import ServiceHistory from './ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<AddTech />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomersList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
