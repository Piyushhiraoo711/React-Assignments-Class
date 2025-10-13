import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <style>
          {`
      .product-details-container {
        max-width: 600px;
        margin: 100px auto 40px auto; /* space for fixed navbar */
        padding: 20px;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .product-details-container h1 {
        font-size: 26px;
        color: #222;
        margin-bottom: 20px;
      }

      .product-card {
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 20px;
        background-color: #fafafa;
        text-align: left;
        margin-bottom: 20px;
      }

      .product-card p {
        margin: 8px 0;
        font-size: 16px;
        color: #444;
      }

      .product-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
      }

      .product-actions button {
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
        transition: background-color 0.2s ease;
        color: #fff;
      }

      .product-actions button:nth-child(1) {
        background-color: #dc3545; /* delete */
      }

      .product-actions button:nth-child(1):hover {
        background-color: #a71d2a;
      }

      .product-actions button:nth-child(2) {
        background-color: #007bff; /* edit */
      }

      .product-actions button:nth-child(2):hover {
        background-color: #0056b3;
      }

      .product-actions button:nth-child(3) {
        background-color: #6c757d; /* back */
      }

      .product-actions button:nth-child(3):hover {
        background-color: #5a6268;
      }

      @media (max-width: 600px) {
        .product-details-container {
          width: 90%;
          padding: 15px;
        }

        .product-actions {
          flex-direction: column;
        }

        .product-actions button {
          width: 100%;
        }
      }
    `}
        </style>

        <div className="product-details-container">
          <h1>Product Details</h1>
          {product ? (
            <div key={crypto.randomUUID()} className="product-card">
              <p>
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}

          <div className="product-actions">
            <button
              onClick={() => {
                fetch(`http://localhost:3000/products/${numericId}`, {
                  method: "DELETE",
                });
                navigate("/");
              }}
            >
              Delete
            </button>
            <button onClick={() => navigate("/edit/" + numericId)}>Edit</button>
            <button onClick={() => navigate("/")}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
