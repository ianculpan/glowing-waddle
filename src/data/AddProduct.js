import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";

const clearData = {
  productId: "",
  description: "",
  qty: 0,
};

export function AddProduct() {
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);
  // const AddProductInfo = {
  //   productId: formData.productId,
  //   description: formData.description,
  //   qty: formData.qty,
  // };

  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        description: formData.description,
        productId: formData.productId,
        qty: formData.qty,
        active: formData.active,
      },
    }
  );

  function formDataPublish() {
    setFormData(clearData);
    setToggleForm(!toggleForm);
  }
  return (
    <>
      <form>
        <label>
          Product Id
          <input
            type="text"
            name="productId"
            onChange={(event) => {
              setFormData({ ...formData, productId: event.target.value });
            }}
            value={formData.productId}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            onChange={(event) => {
              setFormData({ ...formData, description: event.target.value });
            }}
            value={formData.description}
          />
        </label>
        <label>
          Qty
          <input
            type="text"
            name="qty"
            onChange={(event) => {
              setFormData({ ...formData, qty: event.target.value });
            }}
            value={formData.qty}
          />
        </label>
        <input type="submit" value="Submit" onClick={mutateFunction} />
      </form>
    </>
  );
}

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
