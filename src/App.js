import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerRegistration from "./components/customer/CustomerRegistration";
import CustomerHome from "./components/customer/CustomerHome";

function App() {
  return (
      <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< HomePage />} />
                <Route path="/customer/login" element={< CustomerLogin />} />
                <Route path="/customer/register" element={< CustomerRegistration />} />
                <Route path="/customer/home" element={< CustomerHome />} />
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
