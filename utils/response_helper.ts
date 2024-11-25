// response.helper.ts
import { Response } from 'express';

export const success = (res: Response, respSuccessMsg: string, statusCode: number) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500, 209];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) res.statusCode = 500;
  else statusCode = findCode;
  return [
    res.status(statusCode).send({
      status: statusCode,
      message: respSuccessMsg,
    }),
  ];
};

// export const successWithData = (
//   res: Response,
//   respSuccessMsg: string,
//   respErrorMsg: string,
//   Query: any,
//   statusCode: number,
//   condition: number
// ) => {
//   const codes = [200, 201, 400, 401, 404, 403, 422, 500, 209];
//   const findCode = codes.find((code) => code == statusCode);

//   if (!findCode) res.statusCode = 500;
//   else statusCode = findCode;
//   return [
//     res.status(statusCode).send({
//       status: statusCode,
//       message: Query != "" && Query != null ? respSuccessMsg : respErrorMsg,
//       ...(condition == 1 ? {} : { data: Query }),
//     }),
//   ];
// };

export const successWithData = ({
  res,
  successData,
  errorData,
  Query,
  statusCode,
  isQueryShow
}: {
  res: Response;
  successData: string;
  errorData: string;
  Query: any;
  statusCode: number;
  isQueryShow: boolean;
}): any[] => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500, 209];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) res.statusCode = 500;
  else statusCode = findCode;
  return [
    res.status(statusCode).send({
      status: statusCode,
      message: Query != "" && Query != null ? successData : errorData,
      ...(isQueryShow == false ? {} : { data: Query }),
    }),
  ];
};

export const error = (res: Response, message: string, statusCode: number) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) res.statusCode = 500;
  else statusCode = findCode;

  return [
    res.status(statusCode).send({
      status: statusCode,
      message,
    }),
  ];
};
