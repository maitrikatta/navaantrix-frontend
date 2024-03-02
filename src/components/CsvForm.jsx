import { useRef } from "react";
import Button from "./common/Button";
import { validateCSVFile } from "../util/csvparse";
import Card from "./common/Card";
import { actions } from "../util/constants";

const rules = {
  checkColumns: ["id", "firstname", "lastname", "salary", "age"],
  flagErrors: true,
  removeUnwantedColumns: true,
};

function CsvForm({ state, dispatch }) {
  const fileRef = useRef();

  async function handleSubmit() {
    const url = `http://localhost:8000/dashboard/?action=${state.action}`;
    dispatch({ type: "DISABLE_SUB_BTN", payload: true });

    const selectedFile = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("action", state.action);
    formData.append("csvFile", selectedFile);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "USER_ACTION", payload: "default" });
      });
  }

  function getErrors(schemaErr, parseErr) {
    dispatch({ type: "CSV_ERR", payload: parseErr });
  }
  return (
    <Card padding="12px" title="Give your CSV file" darkLevel="cardDarkOne">
      <div className="csvForm">
        <input
          ref={fileRef}
          type="file"
          onChange={() => {
            validateCSVFile(fileRef.current.files[0], rules, getErrors);
          }}
          accept=".csv"
        />
        <select
          // defaultValue={"default"}
          onChange={(ev) =>
            dispatch({ type: "USER_ACTION", payload: ev.target.value })
          }
          value={state.action}
        >
          {actions.map((action, index) => {
            return (
              <option
                key={index}
                disabled={action.value === "default"}
                value={action.value}
              >
                {action.displayValue}
              </option>
            );
          })}
        </select>
        <Button
          handler={handleSubmit}
          disabled={state.action === "default" || state.disableBtn}
        >
          Okay!
        </Button>
      </div>
    </Card>
  );
}

export default CsvForm;
