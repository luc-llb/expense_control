import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import TransactionsView from "./pages/transactions/TransactionsView";
import Overview from "./pages/overview/Overview";
import PersonsView from "./pages/persons/PersonsView";


export default function App() {
    return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions" element={<TransactionsView />} />
      <Route path="/persons" element={<PersonsView />} />
      <Route path="/overview" element={<Overview />} />
    </Routes>
  );
}