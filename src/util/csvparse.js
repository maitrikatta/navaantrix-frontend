import papaparse from "papaparse";
import Joi from "joi";

const createSchema = (rules) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().required(),
    salary: Joi.number().required(),
  });
  return schema;
};

const validateRow = (row) => {
  const errors = [];
  const schema = createSchema(null);
  const value = schema.validate(row);
  if (value.error) {
    value.error.details.forEach((err) => {
      errors.push(err);
    });
  }
  return errors.length ? errors : false;
};

const parsingDone = (results, rules, callback) => {
  const papaErrorArr = results.errors;
  const schemaErrArr = [];

  results.data.forEach((row) => {
    const newRow = {};
    // filter row to desired columns
    rules.checkColumns.forEach(
      (column) => row.hasOwnProperty(column) && (newRow[column] = row[column])
    );

    // check if any data integrity problem
    if (validateRow(newRow)) schemaErrArr.push(validateRow(newRow));
  });
  callback(schemaErrArr, papaErrorArr);
};

export function validateCSVFile(file, rules, errCallback) {
  const CONFIG = {
    complete: (result) => parsingDone(result, rules, errCallback),
    skipEmptyLines: true,
    header: true,
    dynamicTyping: true,
    delimitersToGuess: [",", " "],
    transformHeader: function (h) {
      return h.trim();
    },
  };
  if (!file) return false;
  papaparse.parse(file, CONFIG);
}
