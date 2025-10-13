import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState({
    id: Math.floor(Math.random() * 1000),
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddProduct((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addProduct);
    await axios
      .post(
        `http://localhost:3000/products`,
        {
          ...addProduct,
        },
        { headers: { "Content-Type": "application/json " } }
      )
      .then((res) => {
        console.log("res", res);
        alert("Product Added Successfully");
      })
      .catch((err) => {
        console.log("err", err);
        alert("Something went wrong");
      });
    navigate("/");
  };

  return (
    <div>
      <style>
        {`
      .add-product-container {
        max-width: 600px;
        margin: 100px auto 40px auto; /* spacing for fixed navbar */
        background-color: #ffffff;
        padding: 30px 25px;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .add-product-container h2 {
        font-size: 26px;
        color: #222;
        margin-bottom: 25px;
      }

      .add-product-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        text-align: left;
      }

      .add-product-form input {
        padding: 12px 14px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .add-product-form input:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
      }

      .add-product-form button[type="submit"] {
        padding: 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 10px;
        transition: background-color 0.2s ease;
      }

      .add-product-form button[type="submit"]:hover {
        background-color: #218838;
      }

      @media (max-width: 600px) {
        .add-product-container {
          width: 90%;
          padding: 20px;
        }

        .add-product-form input {
          font-size: 15px;
        }

        .add-product-form button {
          width: 100%;
        }
      }
    `}
      </style>

      <div className="add-product-container">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={addProduct.name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={addProduct.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Product Description"
            name="description"
            value={addProduct.description}
            onChange={handleChange}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
