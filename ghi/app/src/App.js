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
import TechsLists from "./TechsList";
import ApptList from "./ApptList";
import AddAppt from "./ApptForm";
import ServiceHistory from "./ServiceHistory";
import ModelForm from "./ModelForm";
import AutomobilesForm from "./AutosForm";
import AutosList from "./AutosList";
import SaleForm from "./SaleForm";
import SalesList from "./SalesList";
import SalespersonHistory from "./SalespersonHistory";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechsLists />} />
            <Route path="new" element={<AddTech />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
            <Route path="history" element={<SalespersonHistory />} />
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
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutosList />} />
            <Route path="new" element={<AutomobilesForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<ApptList />} />
            <Route path="new" element={<AddAppt />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
