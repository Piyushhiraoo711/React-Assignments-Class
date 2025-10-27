import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../customhooks/useFetchProduct";
import { AppContext } from "../contextAPI/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProduct, editProduct } from "../products/productSlice";

const Edit = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const dispatch = useDispatch();
  // const [product, setProduct] = useState([]);
  // const { state, dispatch } = useContext(AppContext);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const fetchProduct = async () => {
    try {
      const data = await useFetch({
        method: "GET",
        url: `/products/${numericId}`,
      });
      // setProduct(data);
      // dispatch({ type: "get_selected_product", payload: data });
      dispatch(getSelectedProduct(data));
      console.log("current product", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProduct((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log("updated product", updatedProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await useFetch({
        method: "PATCH",
        url: `/products/${numericId}`,
        body: JSON.stringify(updatedProduct),
      });
      // console.log("updated data", data);
      // dispatch({ type: "edit_product", payload: data });
      dispatch(editProduct(data));
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <style>
          {`
      .edit-container {
        max-width: 600px;
        margin: 100px auto 40px auto; /* spacing for fixed navbar */
        background-color: #ffffff;
        padding: 30px 25px;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .edit-container h2 {
        font-size: 26px;
        color: #222;
        margin-bottom: 25px;
      }

      .edit-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        text-align: left;
      }

      .edit-form input {
        padding: 12px 14px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s ease;
      }

      .edit-form input:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
      }

      .edit-form button[type="submit"] {
        padding: 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
        transition: background-color 0.2s ease;
      }

      .edit-form button[type="submit"]:hover {
        background-color: #0056b3;
      }

      .back-btn {
        margin-top: 20px;
        padding: 10px 18px;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 15px;
        transition: background-color 0.2s ease;
      }

      .back-btn:hover {
        background-color: #5a6268;
      }

      @media (max-width: 600px) {
        .edit-container {
          width: 90%;
          padding: 20px;
        }

        .edit-form input {
          font-size: 15px;
        }

        .edit-form button,
        .back-btn {
          width: 100%;
        }
      }
    `}
        </style>
        {console.log("currentProduct", currentProduct)}
        <div className="edit-container">
          <h2>Edit the Product</h2>

          <form onSubmit={handleSubmit} className="edit-form">
            <input
              type="text"
              placeholder={currentProduct?.name}
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder={currentProduct?.price}
              name="price"
              value={updatedProduct?.price}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder={currentProduct?.description}
              name="description"
              value={updatedProduct?.description}
              onChange={handleChange}
            />
            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
