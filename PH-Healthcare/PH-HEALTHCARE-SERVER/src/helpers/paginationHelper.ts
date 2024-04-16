type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResults = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  skip: number;
};

const calculatePagination = (options: IOptions): IOptionsResults => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "asc";
  const skip: number = (page - 1) * limit;

  return { page, limit, sortBy, sortOrder, skip };
};

export const paginationHelper = {
  calculatePagination,
};
