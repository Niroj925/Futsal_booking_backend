import { setSeederFactory } from "typeorm-extension";
import { userEntity } from "src/entity/user.entity";

export const UserFactory = setSeederFactory(userEntity, (faker) => {
  const user = new userEntity();
  user.name = faker.person.fullName();
  user.address = faker.location.streetAddress();
  user.phone = faker.phone.number();
  user.photo = faker.image.avatar();
  return user;
});