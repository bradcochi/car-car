import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddTech from './TechForm';
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
            <Route path="new" element={<AddTech/>}/>
            <Route index element={<ListTechs/>}/>
          </Route>
          <Route path="appointments">
            <Route path="new" element={<ListAppts/>}/>
            <Route index element={<AddAppt/>}/>
            <Route path="history" element={<ServiceHistory/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
