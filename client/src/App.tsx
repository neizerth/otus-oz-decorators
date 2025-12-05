import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TablePage } from './components/TablePage';
import { CreateOrderPage } from './components/CreateOrderPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/table/:tableId" element={<TablePage />} />
        <Route path="/order/create" element={<CreateOrderPage />} />
        <Route path="/" element={<Navigate to="/table/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
