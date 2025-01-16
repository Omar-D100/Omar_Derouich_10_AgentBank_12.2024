// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/banner";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import User from "./pages/user";
import UpdateForm from './components/updateForm';
import Profil from './components/Transaction/Transaction';
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/update" element={<UpdateForm />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;