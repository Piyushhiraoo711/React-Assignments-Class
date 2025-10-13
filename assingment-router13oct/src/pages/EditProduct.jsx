import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  console.log("product_id", id);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/${numericId}`);
      console.log("res", res);
      const data = await res.json();
      setProduct(data);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updatedProduct", updatedProduct);
    try {
      const res = await fetch(`http://localhost:3000/products/${numericId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      console.log("data", data);
      alert("Product Updated Successfully");
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

        <div className="edit-container">
          <h2>Edit the Product</h2>

          <form onSubmit={handleSubmit} className="edit-form">
            <input
              type="text"
              placeholder={product.name}
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder={product.price}
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder={product.description}
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
            />
            <button type="submit">Update Product</button>
          </form>

          <button className="back-btn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
