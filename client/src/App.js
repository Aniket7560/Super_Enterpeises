import './App.css';
import Header from "./components/Header";
import Order from "./components/Order";
import Client from "./components/Client";
import AddOrder from './pages/AddOrder';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import AddClient from './pages/AddClient';
import Cart from './pages/Cart';
import ClientDetails from './pages/ClientDetails';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/client" element={<Client/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/addorder" element={<AddOrder />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/client/:id" element={<ClientDetails />} />
      </Routes>
    </>
  );
}

export default App;
