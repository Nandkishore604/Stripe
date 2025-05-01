import './App.css';
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom'
import Payment from "./component/payment";
import Checkout from "./component/checout";
// import PaymentSuccess from "./PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
          {/* <Route path="checkout" element={<Checkout />} /> */}
          {/* <Route path="success" element={<PaymentSuccess />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
