import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import AppException from 'src/application/exception/app.exception';
import { DbExceptionParser } from './db-exception.parsser';

const rescue = async <T>(args: any): Promise<T> => {
  try {
    return (await args()) as T;
  } catch (e) {
    console.error(e);
    if (e instanceof AppNotFoundException || e instanceof AppNotFoundException) {
      throw e;
    }
    throw new AppException(DbExceptionParser(e));
  }
};

export default rescue;
