import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";

const clearData = {
  contactId: "",
  salutation: "",
  firstName: "",
  secondName: "",
  address1: "",
  address2: "",
  address3: "",
  postTown: "",
  postCode: "",
  county: "",
  contactPhone: "",
  active: "",
  businessName: "",
};

export function AddContact(props) {
  let [toggleForm, setToggleForm] = useState(false);
  let [validForm, setValidForm] = useState(false);
  const { formMode, contact } = props;

  let init;

  if (formMode === "edit" && contact) {
    init = contact;
  } else {
    init = clearData;
  }
  let [formData, setFormData] = useState(init);

  let MUTATE_CONTACT;
  if (formMode === "add") {
    MUTATE_CONTACT = gql`
      mutation createContact($input: InputContact!) {
        createContact(input: $input) {
          contactId
          salutation
          firstName
          secondName
          businessName
          address1
          address2
          address3
          postTown
          county
          postCode
          active
          contactPhone
        }
      }
    `;
  } else {
    MUTATE_CONTACT = gql`
      mutation updateContact($input: InputContact!) {
        updateContact(input: $input) {
          guid
          contactId
          salutation
          firstName
          secondName
          businessName
          address1
          address2
          address3
          postTown
          county
          postCode
          active
          contactPhone
        }
      }
    `;
  }

  const [mutateFunction, { data, loading, error }] = useMutation(
    MUTATE_CONTACT,
    {
      variables: {
        input: {
          guid: formData.guid,
          salutation: formData.salutation,
          contactId: formData.contactId,
          firstName: formData.firstName,
          active: formData.active,
          secondName: formData.secondName,
          businessName: formData.businessName,
          address1: formData.address1,
          address2: formData.address2,
          address3: formData.address3,
          postTown: formData.postTown,
          county: formData.county,
          postCode: formData.postCode,
          contactPhone: formData.contactPhone,
        },
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
        <input type="hidden" value={contact?.guid}></input>
        <div className="grid gap-4 grid-cols-1">
          <div>
            <label className="float-left inputLabel">Contact Id</label>
            <input
              className="float-right inputField"
              type="text"
              name="contactId"
              onChange={(event) => {
                setFormData({ ...formData, contactId: event.target.value });
              }}
              value={formData.contactId}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Salutation</label>
            <input
              className="float-right inputField"
              type="text"
              name="salutation"
              onChange={(event) => {
                setFormData({ ...formData, salutation: event.target.value });
              }}
              value={formData.salutation}
            />
          </div>
          <div>
            <label className="float-left inputLabel">FirstName</label>
            <input
              className="float-right inputField"
              type="text"
              name="firstName"
              onChange={(event) => {
                setFormData({ ...formData, firstName: event.target.value });
              }}
              value={formData.firstName}
            />
          </div>
          <div>
            {" "}
            <label className="float-left inputLabel">SecondName</label>
            <input
              className="float-right inputField"
              type="text"
              name="secondName"
              onChange={(event) => {
                setFormData({ ...formData, secondName: event.target.value });
              }}
              value={formData.secondName}
            />
          </div>

          <div>
            <label className="float-left inputLabel">Business Name</label>
            <input
              className="float-right inputField"
              type="text"
              name="businessName"
              onChange={(event) => {
                setFormData({ ...formData, businessName: event.target.value });
              }}
              value={formData.businessName}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Address 1</label>
            <input
              className="float-right inputField"
              type="text"
              name="address1"
              onChange={(event) => {
                setFormData({ ...formData, address1: event.target.value });
              }}
              value={formData.address1}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Address 2</label>
            <input
              className="float-right inputField"
              type="text"
              name="address2"
              onChange={(event) => {
                setFormData({ ...formData, address2: event.target.value });
              }}
              value={formData.address2}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Address 3</label>
            <input
              type="text"
              name="address3"
              className="float-right inputField"
              onChange={(event) => {
                setFormData({ ...formData, address3: event.target.value });
              }}
              value={formData.address3}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Post Town</label>
            <input
              type="text"
              name="postTown"
              className="float-right inputField"
              onChange={(event) => {
                setFormData({ ...formData, postTown: event.target.value });
              }}
              value={formData.postTown}
            />
          </div>
          <div>
            <label className="float-left inputLabel">County</label>
            <input
              className="float-right inputField"
              type="text"
              name="county"
              onChange={(event) => {
                setFormData({ ...formData, county: event.target.value });
              }}
              value={formData.county}
            />
          </div>
          <div>
            <label className="float-left inputLabel">Post Code</label>
            <input
              className="float-right inputField"
              type="text"
              name="postCode"
              onChange={(event) => {
                setFormData({ ...formData, postCode: event.target.value });
              }}
              value={formData.postCode}
            />
          </div>

          <div className="content-center">
            <label className="float-left">Active</label>
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
            <input type="submit" value="Submit" onClick={mutateFunction} />
          </div>
        </div>
      </form>
    </>
  );
}
