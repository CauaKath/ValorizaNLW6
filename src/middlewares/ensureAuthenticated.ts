import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
) {

  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(401).end();
  }

  const [ ,token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "868ed576e59984d93b6dcb8d61b7eca0") as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}