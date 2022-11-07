import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";

const clearData = {
  WipGuid: "",
  customerGuid: "",
  dateCreated: "1970-01-01",
  netTotal: 0,
  taxTotal: 0,
  grossTotal: 0,
  active: false,
};

/*
"wipGuid": "4ad11d99-3ff2-41ab-b97a-616d18f2ea56",
      "customerGuid": "66b41cdf-7722-4cbb-9117-7557a0b522d7",
      "dateCreated": "2022-10-15",
      "netTotal": 0,
      "taxTotal": 0,
      "grossTotal": 0,
      "active": null
*/
export function AddWip(props) {
  let [toggleForm, setToggleForm] = useState(false);
  let [validForm, setValidForm] = useState(false);
  const { formMode, Wip } = props;

  let init;

  if (formMode === "edit" && Wip) {
    init = Wip;
  } else {
    init = clearData;
  }

  let [formData, setFormData] = useState(init);

  // if (Wip?.WipId?.length > 0 && Wip?.description?.length > 0) {
  //   let [formData, setFormData] = useState(Wip);
  // }
  let MUTATE_WIP;
  if (formMode === "add") {
    MUTATE_WIP = gql`
      mutation CreateWIP($input: InputWip!) {
        createWIP(input: $input) {
          wipGuid
          customerGuid
          dateCreated
          netTotal
          taxTotal
          grossTotal
          active
        }
      }
    `;
  } else {
    MUTATE_WIP = gql`
      mutation UpdateWip($input: InputWip!) {
        updateWip(input: $input) {
          wipGuid
          customerGuid
          dateCreated
          netTotal
          taxTotal
          grossTotal
          active
        }
      }
    `;
  }

  const [mutateFunction, { data, loading, error }] = useMutation(MUTATE_Wip, {
    variables: {
      input: {
        wipGuid: formData.sku ?? "",
        customerGuid: "",
        dateCreated: "1970-01-01",
        netTotal: 0,
        taxTotal: 0,
        grossTotal: 0,
        active: formData.active ?? false,
      },
    },
    onCompleted: (data) => {
      console.log("completed.....", data);
    },
    onError: (data) => {
      console.log(JSON.stringify(data, null, 2));
    },
  });

  function validateFormData() {
    //All fields populated

    return (
      formData?.WipId?.length &&
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
            <label className="float-left inputLabel">Wip Guid</label>
            <input
              placeholder="Generated"
              className="float-right inputField"
              type="text"
              readOnly="readOnly"
              name="wipGuid"
              value={formData.wipGuid}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Wip Id</label>
            <input
              className="float-right inputField"
              type="text"
              name="WipId"
              onChange={(event) => {
                setFormData({ ...formData, WipId: event.target.value });
              }}
              value={formData.WipId}
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
