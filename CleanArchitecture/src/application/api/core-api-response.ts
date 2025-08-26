import { AppResponse } from "src/common/interface/response/app-response";
import { AppPagination } from "src/common/interface/response/app.pagination";
import { IPaginationQuery } from "src/common/interface/response/pagination-options.interface";
import { IPaginationData } from "src/common/interface/response/response-data.interface";

export abstract class CoreApiResponse {
  static success<TData>(
    data: TData,
    statusCode: number = 200,
    message: string = 'success',
  ) {
    return new AppResponse({
      data: data,
      statusCode,
      message,
    });
  }
  static pagination(
    paginationData: IPaginationData,
    query: IPaginationQuery,
    statusCode: number = 200,
    message: string = 'success',
  ) {
    return new AppPagination({
      ...paginationData,
      ...query,
      statusCode,
      message: message,
    });
  }
}

export abstract class CoreWsResponse {
  static success<T>(data: T) {
    return {
      data,
      timestamp: new Date().toISOString(),
    };
  }
}
