import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";

const clearData = {
  productId: "",
  description: "",
  qty: 0,
};

export function AddProduct(props) {
  let [toggleForm, setToggleForm] = useState(false);
  let [validForm, setValidForm] = useState(false);
  const { formMode, product } = props;

  let init;

  if (formMode === "edit" && product) {
    init = product;
  } else {
    init = clearData;
  }

  let [formData, setFormData] = useState(init);

  // if (product?.productId?.length > 0 && product?.description?.length > 0) {
  //   let [formData, setFormData] = useState(product);
  // }
  let MUTATE_PRODUCT;
  if (formMode === "add") {
    MUTATE_PRODUCT = gql`
      mutation CreateProduct($input: InputProduct!) {
        createProduct(input: $input) {
          productId
          description
          qty
          active
        }
      }
    `;
  } else {
    MUTATE_PRODUCT = gql`
      mutation UpdateProduct($input: InputProduct!) {
        updateProduct(input: $input) {
          productId
          description
          qty
          active
        }
      }
    `;
  }

  const [mutateFunction, { data, loading, error }] = useMutation(
    MUTATE_PRODUCT,
    {
      variables: {
        input: {
          sku: formData.sku ?? "",
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
        <div className="grid gap-4 grid-cols-1">
          <div>
            <label className="float-left inputLabel">Product SKU</label>
            <input
              placeholder="Generated"
              className="float-right inputField"
              type="text"
              readOnly="readOnly"
              name="sku"
              value={formData.sku}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Product Id</label>
            <input
              className="float-right inputField"
              type="text"
              name="productId"
              onChange={(event) => {
                setFormData({ ...formData, productId: event.target.value });
              }}
              value={formData.productId}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Description</label>
            <input
              className="float-right inputField"
              type="text"
              name="description"
              onChange={(event) => {
                setFormData({ ...formData, description: event.target.value });
              }}
              value={formData.description}
            />
          </div>
          <div className="content-center">
            <label className="float-left ">Qty</label>
            <input
              className="float-right inputField"
              type="text"
              name="qty"
              onChange={(event) => {
                setFormData({ ...formData, qty: event.target.value });
              }}
              value={formData.qty}
            />
          </div>
          <div className="content-center">
            <label className="float-left ">Active</label>
            <input
              className="float-right inputField"
              type="checkbox"
              name="active"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  active: event.target.checked,
                });
              }}
              checked={!!formData.active}
            />
          </div>
          <div className="center flex-grow">
            <input type="submit" value="Submit" onClick={formDataPublish} />
          </div>
        </div>
      </form>
    </>
  );
}
