import { useQuery } from "@apollo/client";

import gql from "graphql-tag";

const GET_SKIDAYS = gql`
  query {
    allDays {
      date
      mountain
      conditions
      id
    }
  }
`;

export function AllSkiDays() {
  const { loading, error, data } = useQuery(GET_SKIDAYS);
  // const loading = true,
  //   error = false;
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      <p>Skidays goes here</p>
      {data.allDays.map((skiDay) => (
        <li key={skiDay.id}>
          {skiDay.mountain}, {skiDay.conditions}
        </li>
      ))}
    </ul>
  );
}
