import { NextApiRequest, NextApiResponse } from "next";
import Logger from "../middlewares/Logger";
import { Schema } from "ajv";
import SchemaValidation from "../middlewares/ajv.core";

export type FunctionParameters<IncomingData> = {
  log: Logger;
  validate: SchemaValidation<IncomingData>;
};
export type MinimalResponse<OutputData> =
  | {
      data: OutputData;
    }
  | {
      error: string;
    };

export type EndpointFunction<IncomingData, OutputData> = (
  req: NextApiRequest,
  res: NextApiResponse<MinimalResponse<OutputData>>,
  params: FunctionParameters<IncomingData>
) => Promise<OutputData>;

export type EndpointSchemas = {
  path: Schema;
  get: Schema;
  post: Schema;
  patch: Schema;
  delete: Schema;
};
