import { Sequelize, Options } from "sequelize";
import ConfigurationError from "../errors/ConfigurationError";
import Logger from "./Logger";

export default class DBConnection {
  private sequelize: Sequelize;

  constructor(options: Options, private log: Logger) {
    this.sequelize = new Sequelize(options);
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      this.log.info("=== DB Connected === ");
    } catch (error) {
      throw new ConfigurationError("DBConnection");
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      this.log.info("== DB Connection Closed ==");
    } catch (error) {
      throw new ConfigurationError("Error during db closing");
    }
  }

  getSequelizeInstance(): Sequelize {
    return this.sequelize;
  }
}
