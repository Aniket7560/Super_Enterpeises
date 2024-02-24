import './App.css';
import Header from "./components/Header";
import Order from "./components/Order";
import Client from "./components/Client";
import { Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      {/* <Order/> */}
      <Routes>
        <Route path="/client" element={<Client/>} />
        <Route path="/order" element={<Order/>} />
        {/* <Route path="/client" element={<Client/>} /> */}
      </Routes>
    </>
  );
}

export default App;