import { sign, verify } from "jsonwebtoken";

export function signToken(payload: any): any {
	return sign(payload, process.env.SECRET! || "unsafe");
}

export function verifyToken(token: any): any {
	return verify(token, process.env.SECRET! || "unsafe");
}
