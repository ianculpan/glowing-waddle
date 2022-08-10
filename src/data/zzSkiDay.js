/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:4000";

const queryClient = new QueryClient();

export function AllSkiDays() {
  const [SkiDayId, setSkiDayId] = React.useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      {SkiDayId > -1 ? (
        <SkiDay postId={SkiDayId} setPostId={setSkiDayId} />
      ) : (
        <SkiDays setSkiDayId={setSkiDayId} />
      )}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}

function useSkiDays() {
  return useQuery("SkiDays", async () => {
    const {
      SkiDays: { data },
    } = await request(
      endpoint,
      gql`
        query AllDays {
          allDays {
            id
            date
            mountain
            conditions
          }
        }
      `
    );
    console.table(data);
    return data;
  });
}

function SkiDays({ setSkiDayId }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useSkiDays();

  return (
    <div>
      <h1>SkiDays</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.allDays.map((SkiDay) => (
                <p key={SkiDay.id}>
                  <a
                    onClick={() => setSkiDayId(SkiDay.id)}
                    href="#"
                    style={
                      // We can find the existing query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["SkiDay", SkiDay.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {SkiDay.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

function useSkiDay(SkiDayId) {
  return useQuery(
    ["SkiDay", SkiDayId],
    async () => {
      const { SkiDay } = await request(
        endpoint,
        gql`
        query {
          SkiDay(id: ${SkiDayId}) {
            id
            title
            body
          }
        }
        `
      );

      return SkiDay;
    },
    {
      enabled: !!SkiDayId,
    }
  );
}

function SkiDay({ SkiDayId, setSkiDayId }) {
  const { status, data, error, isFetching } = useSkiDay(SkiDayId);

  return (
    <div>
      <div>
        <a onClick={() => setSkiDayId(-1)} href="#">
          Back
        </a>
      </div>
      {!SkiDayId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}
