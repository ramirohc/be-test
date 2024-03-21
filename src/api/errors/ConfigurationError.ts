import GenericError from "./GenericError";

export default class ConfigurationError {
  constructor(msg?: string) {
    return new GenericError(500, msg ?? "Configuration Error");
  }
}
