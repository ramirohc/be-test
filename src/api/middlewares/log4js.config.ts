import * as log4js from "log4js";
import { v4 as uuidv4 } from "uuid";

const getRequestId = () => uuidv4();

const layout = {
  type: "pattern",
  pattern: "%d{yyyy-MM-dd hh:mm:ss} [%p] [RequestId:%x{id}] %m%n",
  tokens: {
    id: getRequestId,
  },
};

log4js.configure({
  appenders: {
    consoleAppender: {
      type: "console",
      layout,
    },
    fileAppender: {
      type: "file",
      filename: "logs/mylogfile.log",
      layout,
    },
  },
  categories: {
    default: {
      appenders: ["fileAppender"],
      level: process.env.LOG_LEVEL ?? "debug",
    },
  },
});

export default log4js;
