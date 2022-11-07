import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_CONTACT = gql`
  query GetContacts($input: InputContactId!) {
    getContact(input: $input) {
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

export function ChosenContact(props) {
  const { chosenContactGuid } = props;
  console.log(chosenContactGuid);
  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: { input: { guid: chosenContactGuid } },
  });

  if (loading) {
    return <>Loading contacts..</>;
  }

  if (error) {
    return <>Error fetching contacts</>;
  }

  if (data) {
    console.log(data);
    return (
      <div>
        <p>
          {data.getContact.firstName} {data.getContact.secondName}
        </p>
        <p>{data.getContact.address1}</p>
        <p>{data.getContact.address2}</p>
        <p>{data.getContact.address3}</p>
        <p>{data.getContact.postTown}</p>
        <p>{data.getContact.county}</p>
        <p>{data.getContact.postCode}</p>
      </div>
    );
  }
}
