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
      mutation CreateContact($input: InputContact!) {
        CreateContact(input: $input) {
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
      mutation CreateContact($input: InputContact!) {
        UpdateContact(input: $input) {
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
          Contact Id
          <input
            type="text"
            name="contactId"
            onChange={(event) => {
              setFormData({ ...formData, contactId: event.target.value });
            }}
            value={formData.contactId}
          />
        </label>
        <div className="flex-row">
          <label>
            Salutation
            <input
              type="text"
              name="salutation"
              onChange={(event) => {
                setFormData({ ...formData, salutation: event.target.value });
              }}
              value={formData.salutation}
            />
          </label>
          <label>
            FirstName
            <input
              type="text"
              name="firstName"
              onChange={(event) => {
                setFormData({ ...formData, firstName: event.target.value });
              }}
              value={formData.firstName}
            />
          </label>
          <label>
            SecondName
            <input
              type="text"
              name="secondName"
              onChange={(event) => {
                setFormData({ ...formData, secondName: event.target.value });
              }}
              value={formData.secondName}
            />
          </label>
        </div>
        <label>
          Business Name
          <input
            type="text"
            name="businessName"
            onChange={(event) => {
              setFormData({ ...formData, businessName: event.target.value });
            }}
            value={formData.businessName}
          />
        </label>
        <div className="justify-center">
          <div className="flex-column">
            <label>
              Address 1
              <input
                type="text"
                name="address1"
                onChange={(event) => {
                  setFormData({ ...formData, address1: event.target.value });
                }}
                value={formData.address1}
              />
            </label>
            <label>
              Address 2
              <input
                type="text"
                name="address2"
                onChange={(event) => {
                  setFormData({ ...formData, address2: event.target.value });
                }}
                value={formData.address2}
              />
            </label>
            <label>
              Address 3
              <input
                type="text"
                name="address3"
                onChange={(event) => {
                  setFormData({ ...formData, address3: event.target.value });
                }}
                value={formData.address3}
              />
            </label>
            <label>
              Post Town
              <input
                type="text"
                name="postTown"
                onChange={(event) => {
                  setFormData({ ...formData, postTown: event.target.value });
                }}
                value={formData.postTown}
              />
            </label>
            <label>
              Post Town
              <input
                type="text"
                name="postTown"
                onChange={(event) => {
                  setFormData({ ...formData, postTown: event.target.value });
                }}
                value={formData.postTown}
              />
            </label>
            <label>
              County
              <input
                type="text"
                name="county"
                onChange={(event) => {
                  setFormData({ ...formData, county: event.target.value });
                }}
                value={formData.county}
              />
            </label>
            <label>
              Post Code
              <input
                type="text"
                name="postCode"
                onChange={(event) => {
                  setFormData({ ...formData, postCode: event.target.value });
                }}
                value={formData.postCode}
              />
            </label>
          </div>
        </div>
        <input type="submit" value="Submit" onClick={mutateFunction} />
      </form>
    </>
  );
}
