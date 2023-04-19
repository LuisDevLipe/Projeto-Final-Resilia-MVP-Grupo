import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer/Footer";
import MeusCartoes from "../pages/MeusCartoes/MeusCartoes";
import { AuthContext, AuthProvider } from "../contexts/auth";
import FaleConosco from "../pages/FaleConosco/FaleConosco";
import MinhaConta from "../pages/MinhaConta/MinhaConta";
import Sobre from "../pages/Sobre/Sobre";
import AdminSobre from "../pages/Admin/Sobre/AdminSobre";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading"> Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route exact path="/cadastro" element={<SignUpPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/faleconosco" element={<FaleConosco />} />
          <Route exact path="/index.html" element={<MainPage />}/>
          <Route exact path="/" element={<MainPage />}/>
          <Route exact path="/sobre" element={<Sobre />}/>
          <Route exact path="/admin/sobre" element={<AdminSobre />}/>
          <Route
            exact
            path="/cartoes"
            element={
              <Private>
                <MeusCartoes />
              </Private>
            }
          />
          <Route
            exact
            path="/conta"
            element={
              <Private>
                <MinhaConta />
              </Private>
            }
          />

        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
