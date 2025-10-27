import { createContext, useReducer, useState } from "react";
import Navbar from "../components/Navbar";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Home from "../pages/Home";
import Edit from "../pages/EditProduct";
import ProductDetails from "../pages/ProductDetails";
import Addproduct from "../pages/AddProduct";
import { Route, Routes, useNavigate } from "react-router-dom";
import PublicRoute from "../protectedRoutes/PublicRoute";
import ProtectedRoute from "../protectedRoutes/ProtectedRoutes";
import useFetch from "../customhooks/useFetchProduct";
import { saveUser } from "../utils/localStorage";

export const AppContext = createContext(null);

export const AppProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const initialState = {
    user: {},
    currentProduct: {},
    allProduct: [],
    deleteProduct: {},
  };

  async function deleteProduct(id) {
    console.log(typeof id);
    const deletedProduct = await useFetch({
      method: "DELETE",
      url: `/products/${Number(id)}`,
      body: JSON.stringify({}),
    });
    return deleteProduct;
  }

  async function addProduct(product) {
    const addedProduct = await useFetch({
      method: "POST",
      url: `/products/${Number(product.id)}`,
      body: JSON.stringify({
        product,
      }),
    });
    return addedProduct;
  }

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload };
      case "logout":
        return { ...state, user: { ...state.user, isLogin: false } };
      case "signup":
        return { ...state, user: action.payload };
      case "get_product":
        return { ...state, allProduct: action.payload };
      case "get_selected_product":
        return { ...state, currentProduct: action.payload };
      case "add_product":
        addProduct(action.payload);
        return { ...state, allProduct: [...state.allProduct, action.payload] };
      case "edit_product":
        return {
          ...state,
          allProduct: state.allProduct.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
      case "delete_product":
        deleteProduct(action.payload);
        const allProduct = state.allProduct.filter(
          (item) => item.id !== Number(action.payload)
        );
        return { ...state, allProduct: allProduct };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add/products"
          element={
            <ProtectedRoute>
              <Addproduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContext.Provider>
  );
};
