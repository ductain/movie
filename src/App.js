import Home from "./pages/home/Home";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Protected from "./Protected/Protected";
import AddMovie from "./pages/add/AddMovie";
import About from "./pages/about/About";
import Watch from "./pages/watch/Watch";
import Update from "./pages/update/Update";
import Account from "./pages/account/Account";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/admin"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <AddMovie />
            </Protected>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Protected>
              <Update />
            </Protected>
          }
        />
        <Route
          path="/account"
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default App;
