import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { useState } from "react";
import { AddProduct } from "../data/AddProduct";
const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      productId
      description
      qty
      active
    }
  }
`;

export function AllProducts() {
  let [toggleAddProduct, setToggleAddProduct] = useState(false);
  let [filterData, setFilterData] = useState("");

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    return (
      <>
        <div className="center">
          <input
            className="inputField"
            onChange={(event) => {
              setFilterData(event.target.value);
            }}
            type="text"
            placeholder="search..."
            value={filterData}
          ></input>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th></th>
              <th>Product Id</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.getAllProducts
              .filter((product) => {
                return filterData.length <= 0
                  ? true
                  : product.productId
                      .toLowerCase()
                      .indexOf(filterData.toLowerCase()) >= 0 ||
                      product.description
                        .toLowerCase()
                        .indexOf(filterData.toLowerCase()) >= 0;
              })
              .map((product, index) => (
                <tr key={index.toString()}>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td> {product.productId}</td>
                  <td> {product.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={() => {
            setToggleAddProduct(!toggleAddProduct);
          }}
        >
          Add Product
        </button>
        {toggleAddProduct && <AddProduct />}
      </>
    );
  }
  return <h3>No products.</h3>;
}
