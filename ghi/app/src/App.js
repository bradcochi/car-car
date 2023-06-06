import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddTech from './TechForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<AddTech/>}/>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
