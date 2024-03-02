import React, { useReducer } from "react";
import csvdashboard from "../reducers/csvdashboard";

import CsvForm from "./CsvForm";
import CsvErrors from "./CsvErrors";
import CreateObject from "./CreateObject";
import MapObject from "./MapObject";

import "../style/dashboard.css";

const initialState = {
  action: "default",
  disableBtn: false,
  isValidCSV: false,
  csvErrors: [],
  objects: [],
};

function DataDashboard() {
  const [state, dispatch] = useReducer(csvdashboard, initialState);

  return (
    <main className="dashContainer cardDarkTwo">
      <div className="csvDash">
        <CsvForm state={state} dispatch={dispatch} />
        <CsvErrors state={state} dispatch={dispatch} />
      </div>
      <div className="objectDash">
        <CreateObject />
        <MapObject />
      </div>
    </main>
  );
}

export default DataDashboard;
