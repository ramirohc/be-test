import { NextApiRequest, NextApiResponse } from "next";
import UnsupportMethodError from "../errors/UnsupportedMethodError";
import { EndpointFunction, MinimalResponse } from "../types/endpoints";
import Logger from "./Logger";
import { GenericError } from "../types/error";
import SchemaValidation from "./ajv.core";

export default class EndpointBuilder<IncomingData, OutputData> {
  private functions = new Map<
    string,
    EndpointFunction<IncomingData, OutputData>
  >();

  onGet = (fn: EndpointFunction<IncomingData, OutputData>) => {
    this.functions.set("GET", fn);
    return this;
  };
  onPost = (fn: EndpointFunction<IncomingData, OutputData>) => {
    this.functions.set("POST", fn);
    return this;
  };
  onPatch = (fn: EndpointFunction<IncomingData, OutputData>) => {
    this.functions.set("PATCH", fn);
    return this;
  };
  onDelete = (fn: EndpointFunction<IncomingData, OutputData>) => {
    this.functions.set("DELETE", fn);
    return this;
  };

  // TODO Pending
  useBasicAuth = () => this;
  // TODO Pending
  useTokenAuth = () => this;

  build =
    () =>
    async (
      req: NextApiRequest,
      res: NextApiResponse<MinimalResponse<OutputData>>
    ) => {
      const log = new Logger();
      const validate = new SchemaValidation(log);
      try {
        if (!req.method) throw new UnsupportMethodError();
        const fn = this.functions.get(req.method);
        if (!fn) throw new UnsupportMethodError();

        log.info(`Incoming Data:`, req.method === "GET" ? req.query : req.body);

        const response = await fn(req, res, { log, validate });
        res.status(200).json({ data: response });
      } catch (err) {
        const error = err as GenericError;
        log.error(error.message);
        res
          .status(error.code ?? 503)
          .json({ error: error.message ?? "UnexpectedError" });
      }
    };
}
