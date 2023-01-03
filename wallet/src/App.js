import Wallet from "./components/Wallet.js";
import Send from "./components/Send.js";
import Deposit from "./components/Deposit.js";
import Withdraw from "./components/Withdraw.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Wallet />} />

          <Route exact path="/send" element={<Send />} />

          <Route exact path="/deposit" element={<Deposit />} />

          <Route exact path="/Withdraw" element={<Withdraw />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
