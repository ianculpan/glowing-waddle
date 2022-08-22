import { useMutation, useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { Form } from "react-final-form";
import { NavLink } from "react-router-dom";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: InputProduct!) {
    createProduct(input: $input) {
      productId
      description
      qty
      active
    }
  }
`;
const formState = {};
// const [createProduct] = useMutation(CREATE_PRODUCT, {
//   variables: {
//     description: formState.description,
//     productId: formState.productId,
//     qty: formState.qty,
//     active: formState.active,
//   },
// });

function handleSubmit(event) {
  //createProduct;
  event.preventDefault();
}

export function AddProduct() {
  return (
    <>
      <form
        onSubmit={() => {
          handleSubmit(event);
        }}
      >
        <label>
          Product Id
          <input type="text" name="productId" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <label>
          Qty
          <input type="text" name="qty" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
