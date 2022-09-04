import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";

const clearData = {
  productId: "",
  description: "",
  qty: 0,
};

export function AddProduct(product) {
  let [toggleForm, setToggleForm] = useState(false);
  let [validForm, setValidForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  if (product?.productId?.length > 0 && product?.description?.length > 0) {
    let [formData, setFormData] = useState(product);
  }

  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        input: {
          description: formData.description,
          productId: formData.productId,
          qty: Number(formData.qty),
          active: formData.active ?? false,
        },
      },
      onCompleted: (data) => {
        console.log("completed.....", data);
      },
      onError: (data) => {
        console.log(JSON.stringify(data, null, 2));
      },
    }
  );

  function validateFormData() {
    //All fields populated

    return (
      formData?.productId?.length &&
      formData?.description?.length &&
      formData?.qty >= 0
    );
  }

  function formDataPublish() {
    setValidForm(validateFormData());
    mutateFunction();
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
        <input type="submit" value="Submit" onClick={formDataPublish} />
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
