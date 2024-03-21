/* eslint-disable @typescript-eslint/no-explicit-any */
import log4js from "./log4js.config";

export default class Logger {
  private log;
  constructor() {
    this.log = log4js.getLogger();
  }
  debug = (message: string, ...args: any[]) => this.log.debug(message, args);
  info = (message: string, ...args: any[]) => this.log.info(message, args);
  warn = (message: string, ...args: any[]) => this.log.warn(message, args);
  error = (message: string, ...args: any[]) => this.log.error(message, args);
}
