import { setSeederFactory } from "typeorm-extension";
import { authEntity } from "src/entity/auth.entity";
import { hash } from "src/common/helpers/hash.helper";
import { roleType } from "src/common/constants";

export const AuthFactory = setSeederFactory(authEntity, async (faker) => {
  const auth = new authEntity();
  const hashing = new hash();
  auth.email = faker.internet.email();
  auth.password = await hashing.value('password');
  auth.role = faker.helpers.arrayElement(Object.values(roleType));
  auth.rToken = null;
  return auth;
});