import React, { useReducer } from "react";

export function UserMenu(props) {
  //const [loginFlag, setLogin] = React.useState();
  //console.log(props.loginFlag);

  const [openMenu, toggleOpen] = useReducer((openMenu) => !openMenu, false);
  return (
    <div>
      {openMenu ? (
        <div className="UserMenu">
          <button onClick={props.toggleLogin}>
            {props.loginFlag ? "Logoff" : "Logon"}
          </button>
          <button>Account</button>
          <button>Options</button>
          {<button onClick={toggleOpen}>x</button>}
        </div>
      ) : (
        <div>{<button onClick={toggleOpen}>Menu</button>}</div>
      )}
    </div>
  );
}
