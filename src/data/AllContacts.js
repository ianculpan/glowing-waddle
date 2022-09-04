import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

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
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    return (
      <>
        <ul>
          {data.getAllContacts.map((contact, index) => (
            <li key={index.toString()}>
              <div className="text-xl flex-row">
                {contact.contactId},{contact.salutation} {contact.firstName}{" "}
                {contact.secondName}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  return <h3>No contacts.</h3>;
}
