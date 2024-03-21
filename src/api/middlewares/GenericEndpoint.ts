import { NextApiRequest, NextApiResponse } from "next";
import { EndpointSchemas, FunctionParameters } from "../types/endpoints";
import GenericService from "./GenericService";
import BadRequestError from "../errors/BadRequestError";

export default class GenericEndpoint<
  OutputData,
  ServiceImplementation extends GenericService<OutputData>
> {
  constructor(
    private schemas: EndpointSchemas,
    private service: ServiceImplementation
  ) {
    // Not need for now
  }

  protected onGet = async <IncomingData>(
    req: NextApiRequest,
    res: NextApiResponse,
    params: FunctionParameters<IncomingData>
  ) => {
    const { log, validate } = params;
    try {
      log.debug("Executing Generic Get function");
      if (!validate.validate(req.query as IncomingData, this.schemas.get)) {
        throw new BadRequestError(
          "Error with the request, please verify the data"
        );
      }
      return this.service.get(req.query);
    } catch (err) {
      log.error("Error during the Generic Get Function", err);
      throw err;
    }
  };
  protected onPost = async <IncomingData>(
    req: NextApiRequest,
    res: NextApiResponse,
    params: FunctionParameters<IncomingData>
  ) => {
    const { log, validate } = params;
    try {
      log.debug("Executing Generic Get function");
      if (!validate.validate(req.query as IncomingData, this.schemas.get)) {
        throw new BadRequestError(
          "Error with the request, please verify the data"
        );
      }
      return this.service.get(req.query);
    } catch (err) {
      log.error("Error during the Generic Get Function", err);
      throw err;
    }
  };
}
