import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

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
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  // const loading = true,
  //   error = false;
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    return (
      <>
        <ul>
          {data.getAllProducts.map((product, index) => (
            <li key={index.toString()}>
              {product.productId}, {product.description}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return <h3>No products.</h3>;
}
