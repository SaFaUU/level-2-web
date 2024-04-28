import { UserRole } from "@prisma/client";

export type IAuthUser = {
  email: string;
  role: UserRole;
} | null;

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string;
  message: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
