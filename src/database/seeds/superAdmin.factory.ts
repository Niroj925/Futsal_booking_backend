import { setSeederFactory } from "typeorm-extension";
import { superAdminEntity } from "src/entity/superAdmin.entity";

export const SuperAdminFactory = setSeederFactory(superAdminEntity, (faker) => {
  const superAdmin = new superAdminEntity();
  superAdmin.name = faker.person.fullName();
  superAdmin.photo = faker.image.avatar();
  return superAdmin;
});