// const logger = new AppLogger('Db Exception Parser');

import { IError } from "../type/IError";


const dubplicateKey = (e: any): IError => {
  const { detail } = e;
  const regex = /Key \((.*?)\)=\((.*?)\) already exists\./g;
  const match = regex.exec(detail);
  if (!match) {
  return { message: 'Invalid duplicate key error format' };
}
  const [, key, value] = match;
  return {
    [key]: `${value} already exists`,
  };
};

export const DbExceptionParser = (e: any): IError => {
  const { code } = e;
  switch (code as string) {
    case '23505':
      return dubplicateKey(e);
    default:
      // logger.error(e);
      return {
        message: e.message,
      };
  }
};
