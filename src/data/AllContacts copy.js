import { useMutation, useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { useState } from "react";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
  guid: "",
};

const GET_ALL_CONTACTS = gql`
  query {
    getAllContacts {
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

export function AllContacts() {
  const { loading, error, data } = useQuery(GET_ALL_CONTACTS);
  let [filterData, setFilterData] = useState("");
  let [selectedContact, setSelectedContact] = useState(clearData);
  let [selectedGuid, setSelectedGuid] = useState("");
  let [formMode, setFormMode] = useState("add");
  let [toggleAddContact, setToggleAddContact] = useState(false);

  const DELETE_CONTACT = gql`
    mutation DeleteContact($input: InputContactId!) {
      deleteContact(input: $input) {
        guid
      }
    }
  `;
  console.log("Selected Contact....", JSON.stringify(selectedContact));
  const [
    mutateFunction,
    { dataMutationDelete, loadingMutationDelete, errorMutationDelete },
  ] = useMutation(DELETE_CONTACT, {
    variables: {
      input: {
        guid: selectedGuid,
      },
    },
  });

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
                            .indexOf(filterData.toLowerCase()) >= 0;
                  })
                  .map((contact, index) => (
                    <tr key={index.toString()}>
                      <td>
                        <input type="hidden" value={contact.guid}></input>
                        <button
                          onClick={() => {
                            setSelectedContact({ contact });
                            setFormMode("edit");
                            setToggleAddContact(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          value={contact.guid}
                          onClick={(e) => {
                            setSelectedGuid(e.target.value);
                            confirmAlert({
                              title: "Confirm to submit",
                              message: "Are you sure?",
                              closeOnEscape: true,
                              closeOnClickOutside: true,
                              keyCodeForClose: [8, 32],
                              buttons: [
                                {
                                  label: "Yes",
                                  onClick: () => {
                                    mutateFunction();
                                  },
                                },
                                {
                                  label: "No",
                                  onClick: () => {
                                    setSelectedGuid("");
                                  },
                                },
                              ],
                            });
                          }}
                        >
                          Delete
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
