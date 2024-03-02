import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import Card from "./common/Card";

import "../style/createObjects.css";
function CreateObject() {
  const [state, setState] = useState({
    objectName: "",
    editObject: true,
    fieldName: "",
    fieldType: "string",
    object: [],
  });
  function insertFieldHandler() {
    setState((prevState) => {
      return {
        ...prevState,
        object: [
          ...prevState.object,
          { fieldName: state.fieldName, fieldType: state.fieldType },
        ],
        fieldName: "",
        fieldType: "string",
      };
    });
  }

  async function createObjectHandler() {
    const url = `http://localhost:8000/objects/?object=create`;
    const formData = new FormData();
    formData.append("objectName", state.objectName);
    formData.append("objectFields", state.object);
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        objectFields: state.object,
        objectName: state.objectName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      console.log(result);
    }
  }

  return (
    <Card padding="12px" title="Manage your objects">
      <div className="insertedField">
        <FieldsCreated state={state} />
      </div>
      <div className="inputWrapper">
        <span className="editObject">
          {state.editObject ? (
            <input
              type="text"
              value={state.objectName}
              onChange={(ev) =>
                setState({ ...state, objectName: ev.target.value })
              }
              placeholder="Enter Object name"
            />
          ) : (
            <span>{state.objectName}</span>
          )}
          <button
            className="editBtn"
            onClick={() =>
              setState({ ...state, editObject: !state.editObject })
            }
          >
            {state.editObject ? "LOCK" : "EDIT"}
          </button>
        </span>
        <span>
          <input
            type="text"
            onChange={(ev) =>
              setState({ ...state, fieldName: ev.target.value })
            }
            placeholder="Enter field name"
            value={state.fieldName}
          ></input>
          <FieldOptions state={state} setState={setState} />
        </span>
        <span>
          <Button
            disabled={!state.objectName.length || !state.fieldName.length}
            handler={insertFieldHandler}
          >
            Insert Field
          </Button>
          <Button
            disabled={!state.objectName.length || !state.object.length}
            handler={createObjectHandler}
          >
            Create Object
          </Button>
        </span>
      </div>
    </Card>
  );
}

function FieldsCreated({ state }) {
  return (
    <>
      {state.object.map((field, index) => {
        return (
          <div key={index} className="fieldItemRow">
            <span>{field.fieldName}</span>
            <span>{field.fieldType}</span>
          </div>
        );
      })}
    </>
  );
}
function FieldOptions({ state, setState }) {
  return (
    <select
      onChange={(ev) => setState({ ...state, fieldType: ev.target.value })}
      value={state.fieldType}
    >
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="date">Date</option>
    </select>
  );
}
export default CreateObject;
