import { useQuery } from "@apollo/client";

import gql from "graphql-tag";
import { useState } from "react";
// import { AddProduct } from "../data/AddProduct";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
const GET_ALL_WIP = gql`
  query {
    getAllWip {
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

const clearData = {
  product: {
    productId: "",
    description: "",
    qty: 0,
  },
  mode: "add",
};

export function AllWip() {
  let [toggleAddProduct, setToggleAddProduct] = useState(false);
  let [filterData, setFilterData] = useState("");
  // let [selectedProduct, setSelectedProduct] = useState(clearData);
  let [formMode, setFormMode] = useState("add");

  const { loading, error, data } = useQuery(GET_ALL_WIP);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    return (
      <>
        {!toggleAddProduct && (
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
                  <th>Wip Id</th>
                </tr>
              </thead>
              <tbody>
                {data.getAllWip
                  .filter((wip) => {
                    return filterData.length <= 0
                      ? true
                      : wip.wipGuid
                          .toLowerCase()
                          .indexOf(filterData.toLowerCase()) >= 0;
                  })
                  .map((wip, index) => (
                    <tr key={index.toString()}>
                      <td>
                        <button
                        // onClick={() => {
                        //   setSelectedProduct({ wip });
                        //   setFormMode("edit");
                        //   setToggleAddProduct(true);
                        // }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        {wip.active ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        <button
          onClick={() => {
            //setSelectedProduct(clearData);
            setToggleAddProduct(!toggleAddProduct);
          }}
        >
          Add WIP
        </button>
        {toggleAddProduct && (
          <AddProduct formMode={formMode} {...selectedProduct} />
        )}
      </>
    );
  }
  return <h3>No WIP.</h3>;
}
