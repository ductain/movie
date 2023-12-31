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
import Favorites from "./pages/favourite/favourite";
import Upcoming from "./pages/upcoming/Upcoming";
import { UserAuth } from "./context/AuthContext";
import Recommendation from "./pages/recommendation/Recommendation";
const App = () => {
  const { user } = UserAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/recommend" element={<Recommendation />} />
        <Route path="/about" element={<About />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/favorites"
          element={
            <Protected>
              <Favorites />
            </Protected>
          }
        />
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
