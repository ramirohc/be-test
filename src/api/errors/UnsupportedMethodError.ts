import GenericError from "./GenericError";

export default class UnsupportMethodError {
  constructor() {
    return new GenericError(503, "Unsupport Error");
  }
}
