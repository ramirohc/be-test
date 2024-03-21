export default abstract class GenericService<OutputData> {
  abstract get<IncomingData>(...params: IncomingData[]): Promise<OutputData[]>;
  abstract post<IncomingData>(...params: IncomingData[]): Promise<OutputData>;
  abstract patch<IncomingData>(...params: IncomingData[]): Promise<OutputData>;
  abstract delete<IncomingData>(...params: IncomingData[]): Promise<boolean>;
}
