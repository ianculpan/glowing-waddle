import React, { useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MainRoutes } from "./Routes";
import { MainMenu } from "./components/navigation/main";
import { MainFooter } from "./components/navigation/MainFooter";

function App() {
  const [loginFlag, toggleLogin] = useReducer((loginFlag) => !loginFlag, false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MainMenu loginFlag={loginFlag} toggleLogin={toggleLogin} />
      </header>
      <div className="App-content">
        <div>
          <MainRoutes />
        </div>
      </div>
      <div className="App-footer">
        <MainFooter />
      </div>
    </div>
  );
}

export default App;
