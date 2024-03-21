import Ajv, { Schema } from "ajv";
import Logger from "./Logger";

export default class SchemaValidation<A> {
  constructor(private log: Logger) {
    // Not need
  }

  validate = (data: A, schema: Schema) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    if (!isValid) {
      this.log.error("Errors", validate.errors);
    }
    return isValid;
  };
}
