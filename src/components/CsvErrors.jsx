import React from "react";
import Card from "./common/Card";
function CsvErrors({ state, dispatch }) {
  const { csvErrors } = state;
  console.log(csvErrors);

  return (
    <Card padding="12px" title="Errors found in CSV file">
      <div className="errLogCont">
        {csvErrors.slice(0, 3).map((err, index) => {
          console.log(err);
          return (
            <div key={index} className="errLogItem">
              <span>{err.message}</span>
              <span>On row : {err.row + 1}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default CsvErrors;
