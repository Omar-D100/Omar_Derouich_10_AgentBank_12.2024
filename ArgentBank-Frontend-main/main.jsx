import { BrowserRouter, Routes , Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import Banner from "./components/banner";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import User  from "./pages/user";
import UpdateForm from './components/updateForm';
import Profil from './components/Profil';
import Footer  from "./components/Footer";



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <Banner/>
    
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/update" element={<UpdateForm />} />
        <Route path="/profil" element={<Profil />} />

      </Routes>
    <Footer/>
  
  </BrowserRouter>
)
