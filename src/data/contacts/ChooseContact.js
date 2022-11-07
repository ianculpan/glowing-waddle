import { useQuery } from "@apollo/client";
import { useState } from "react";

import gql from "graphql-tag";

const GET_ALL_CONTACTS = gql`
  query GetAllContacts {
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

export function ChooseContact(props) {
  const { selectedAction, initialSelected } = props;
  const { loading, error, data } = useQuery(GET_ALL_CONTACTS);

  if (loading) {
    return <>Loading contacts..</>;
  }

  if (error) {
    return <>Error fetching contacts</>;
  }

  if (data) {
    // console.log(JSON.stringify(data.getAllContacts));
    return (
      <div>
        <select
          className="inputField"
          onChange={selectedAction}
          value={initialSelected}
        >
          {data.getAllContacts?.map((contact) => {
            return (
              <option key={contact.guid} value={contact.guid}>
                {`${contact.firstName} ${contact.secondName}`}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
