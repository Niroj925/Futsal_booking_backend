import { Logger } from '@nestjs/common';
import { IError } from '../type/IError';


// const dubplicateKey = (e: any): IError => {
//   const { detail } = e;
//   const regex = /Key \((.*?)\)=\((.*?)\) already exists\./g;
//   const match = regex.exec(detail);
//   const [, key, value] = match;
//   return {
//     [key]: `${value} already exists`,
//   };
// };
const duplicateKey = (e: any): IError => {
  const { detail } = e;
  const regex = /Key \((.*?)\)=\((.*?)\) already exists\./g;
  const match = regex.exec(detail);

  if (match) {
    const [, key, value] = match;
    return {
      [key]: `${value} already exists`,
    };
  }

  // Default fallback error if regex fails
  return {
    error: 'Duplicate key error',
  };
};


export const DbExceptionParser = (e: any): IError => {
  const { code } = e;
  switch (code as string) {
    case '23505':
      return duplicateKey(e);
    default:
      Logger.error(e, DbExceptionParser.name);
      return {
        message: e.message,
      };
  }
};
