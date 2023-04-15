import React, { createContext, useState, useEffect } from "react";
import {
  API,
  createSession,
  createUser,
  deleteUser,
  updateUser,
  createMensagem,
  postarSobre,
  getSobre,
  deleteSobre,
  updateSobre,
} from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [sobre, SetSobre] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      API.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const cadastro = async (nome, cpf, email, password) => {
    try {
      if (!email && !password) {
        return setSignUpError("Email inválido");
      }
      const response = await createUser(nome, cpf, email, password);
      console.log(response);
      login(email, password);
      setSignUpError("");
      // navigate('/')
    } catch (err) {
      console.error(err);
      return setSignUpError("Usuário já cadastrado");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await createSession(email, password);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      API.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      setLoginError("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoginError(
        "Usuário ou senha Inválido, tente novamente ou contate o suporte"
      );
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    API.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  const deleteAcc = async () => {
    try {
      const userId = user.id;
      await deleteUser(userId);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      API.defaults.headers.Authorization = null;
      setUser(null);
      navigate("/cadastro");
    } catch (err) {
      console.log(err);
    }
  };
  const update = async (userId, nome, email, idade, cpf, password) => {
    await updateUser(userId, nome, email, idade, cpf, password);
  };
  const postMensagem = async (mensagemSend) => {
    mensagemSend.userId = user?.id;
    try {
      await createMensagem(user?.id, mensagemSend);
    } catch (err) {
      console.log(err);
    }
  };
  const AdminSobrePost = async (titulo, texto) => {
    try {
      await postarSobre(titulo, texto);
      bugfix();
    } catch (e) {
      console.log(e);
    }
  };
  const AdminSobreDelete = async (id) => {
    try {
      await deleteSobre(id);
      bugfix();
    } catch (e) {
      console.log(e);
    }
  };
  const AdminSobreUpdate = async (a, b, c) => {
    try {
      await updateSobre(a, b, c);
      bugfix();
    } catch (e) {
      console.log(e);
    }
  };
  const bugfix = async () => {
    //fetch sobre
    try {
      const data = await getSobre();
      SetSobre(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => await bugfix())();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user, //Boolean(user)
        user,
        loading,
        cadastro,
        signUpError,
        login,
        loginError,
        logout,
        deleteAcc,
        update,
        postMensagem,
        AdminSobrePost,
        AdminSobreDelete,
        AdminSobreUpdate,
        sobre,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
