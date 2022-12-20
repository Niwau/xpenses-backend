import { UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

interface Payload {
  id: number
  name: string
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  jwt.verify(req.headers.authorization, process.env.SECRET, (err, payload) => {
    if (err) throw new UnauthorizedException("Invalid token")
    req.user = payload as Payload
  })
  
  next();
}