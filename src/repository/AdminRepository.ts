import {AbstractRepository} from "./AbstractRepository";
import {AdminPojo, AdminInstance} from "../domain/sequelize-types";

export class AdminRepository extends AbstractRepository<AdminInstance, AdminPojo> {

  constructor() {
    super();
  }

  protected setModel(): void {
    this.model = this.models.AdminModel;
  }
}