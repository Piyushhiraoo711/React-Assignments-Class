import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("data", data);
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
      .home-container {
        padding: 20px;
        text-align: center;
        margin : 20px
      }

      .home-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
      }

      .product-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        justify-content: center;
        padding: 0 10px;
      }

      .product-card {
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        padding: 15px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        background-color: #fff;
      }

      .product-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .product-card p {
        margin: 6px 0;
        color: #444;
        text-align: left;
      }

      .product-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      button {
        background-color: #007bff;
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      button:hover {
        background-color: #0056b3;
      }

      button:first-child {
        background-color: #dc3545;
      }

      button:first-child:hover {
        background-color: #a71d2a;
      }

      @media (max-width: 600px) {
        .home-title {
          font-size: 20px;
        }

        .product-card {
          padding: 12px;
        }

        button {
          font-size: 13px;
          padding: 6px 10px;
        }
      }
    `}
        </style>

        <div className="home-container">
          <div className="home-title">All Products with Details</div>
          <div>
            <style>
              {`
      .product-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
      }

      .product-card {
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        padding: 15px;
        background-color: #fff;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .product-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .product-card p {
        margin: 6px 0;
        color: #333;
        text-align: left;
      }

      .product-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      button {
        background-color: #007bff;
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      button:hover {
        background-color: #0056b3;
      }

      button:first-child {
        background-color: #dc3545;
      }

      button:first-child:hover {
        background-color: #a71d2a;
      }

      /* ✅ Responsive breakpoints */
      @media (max-width: 1024px) {
        .product-list {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .product-list {
          grid-template-columns: repeat(1, 1fr);
        }

        .product-card {
          padding: 12px;
        }

        button {
          font-size: 13px;
          padding: 6px 10px;
        }
      }
    `}
            </style>

            <div className="product-list">
              {products ? (
                products.map((product) => (
                  <div
                    key={crypto.randomUUID()}
                    className="product-card"
                    onClick={() => navigate("/product/" + product.id)}
                  >
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Description:</strong> {product.description}
                    </p>
                    <div className="product-actions">
                      <button onClick={deleteProduct}>Delete</button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/edit/" + product.id);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
