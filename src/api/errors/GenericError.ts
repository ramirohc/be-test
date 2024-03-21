export default class GenericError extends Error {
  constructor(private code: number, message: string) {
    super(message);
  }
}
