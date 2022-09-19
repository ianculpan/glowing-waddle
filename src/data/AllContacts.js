import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AddContact } from "./AddContact";

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

const GET_ALL_CONTACTS = gql`
  query {
    getAllContacts {
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

export function AllContacts() {
  const { loading, error, data } = useQuery(GET_ALL_CONTACTS);
  let [filterData, setFilterData] = useState("");
  let [selectedContact, setSelectedContact] = useState(clearData);
  let [formMode, setFormMode] = useState("add");
  let [toggleAddContact, setToggleAddContact] = useState(false);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    return (
      <>
        {!toggleAddContact && (
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
                  <th>Contact Id</th>
                  <th>First Name</th>
                  <th>Second Name</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {data.getAllContacts
                  .filter((contact) => {
                    return filterData.length <= 0
                      ? true
                      : contact.contactId
                          .toLowerCase()
                          .indexOf(filterData.toLowerCase()) >= 0 ||
                          contact.firstName
                            .toLowerCase()
                            .indexOf(filterData.toLowerCase()) >= 0 ||
                          contact.secondName
                            .toLowerCase()
                            .indexOf(filterData.toLowerCase());
                  })
                  .map((contact, index) => (
                    <tr key={index.toString()}>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedContact({ contact });
                            setFormMode("edit");
                            setToggleAddContact(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>{contact.contactId}</td>
                      <td>{contact.firstName}</td>
                      <td>{contact.secondName}</td>
                      <td>
                        {contact.active ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              onClick={() => {
                setSelectedContact(clearData);
                setToggleAddContact(!toggleAddContact);
              }}
            >
              Add Contact
            </button>
          </>
        )}

        {toggleAddContact && (
          <AddContact formMode={formMode} {...selectedContact} />
        )}
      </>
    );
  }
  return <h3>No contacts.</h3>;
}
