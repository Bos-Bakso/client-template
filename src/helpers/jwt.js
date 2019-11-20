import jwt from "jsonwebtoken";

const secret = "BOSBAKSO";

export const verifyToken = token => {
  return jwt.verify(token, secret);
};
