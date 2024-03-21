import GenericError from "./GenericError";

export default class BadRequestError {
  constructor(msg?: string) {
    return new GenericError(404, msg ?? "BadRequestError");
  }
}
