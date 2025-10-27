import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "../appcss/home.css";
import useFetch from "../customhooks/useFetchProduct";
import { AppContext } from "../contextAPI/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { deletedProduct, getProducts } from "../products/productSlice";

const Home = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(AppContext);
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  const fetchProduct = async () => {
    try {
      // setIsLoading(true);
      const data = await useFetch({
        method: "GET",
      });
      console.log(data);
      if (data) {
        // setProducts(data);
        // dispatch({ type: "get_product", payload: data });
        dispatch(getProducts(data));
      } else {
        console.log("error", error);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await useFetch({
        method: "DELETE",
        url: `/products/${Number(id)}`,
        body: JSON.stringify({}),
      });
      // dispatch({ type: "delete_product", payload: id });
      dispatch(deletedProduct(Number(id)));
      await fetchProduct();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <div>
        <div className="home-container">
          <div className="home-title">All Products with Details</div>
          <div>
            <div className="product-list">
              {products.length > 0 ? (
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                      >
                        Delete
                      </button>
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
                <div>No Data Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
