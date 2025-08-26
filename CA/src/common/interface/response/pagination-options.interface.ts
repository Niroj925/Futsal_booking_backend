export class IPaginationQuery {
  page?: number;
  limit?: number;
}

export class IPaginationWithFilters<T = any> extends IPaginationQuery {
  filters?: T;
}
