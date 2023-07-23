import Home from "./pages/home/Home";
import './app.scss'
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Protected from './Protected/Protected'
import AddMovie from "./pages/add/AddMovie";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Watch from "./pages/watch/Watch";
import Update from "./pages/update/Update";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/watch/:id" element={<Watch/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/add" element={<Protected><AddMovie/></Protected>} />
        <Route path="/edit/:id" element={<Protected><Update/></Protected>} />
      </Routes>
    </>
  )
};

export default App;
