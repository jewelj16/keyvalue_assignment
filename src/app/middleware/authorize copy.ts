import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
const authorize = (user: string) => {
 return async (
   req: RequestWithUser,
   res: express.Response,
   next: express.NextFunction
 ) => {
   try {
     const token = getTokenFromRequestHeader(req);
     jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
     const gotRole = jsonwebtoken.decode(token)
     const p2 = JSON.stringify(gotRole);
     const p3 = JSON.parse(p2);
     const payloaddata = p3.customrole
     if(payloaddata === user){
      return next();
     }
     else{
      return next(new UserNotAuthorizedException());
     }
     console.log(jsonwebtoken.decode(token));
     
   } catch (error) {
     return next(new UserNotAuthorizedException());
   }
 };
};
const getTokenFromRequestHeader = (req: RequestWithUser) => {
    const tokenWithBearerHeader = req.header(
      `${APP_CONSTANTS.authorizationHeader}`
    );
    if (tokenWithBearerHeader) {
      return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
    }
    return "";
   };
export default authorize;








