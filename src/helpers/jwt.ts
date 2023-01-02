import { sign, verify } from "jsonwebtoken";

export function signToken(payload: any) {
	return sign(payload, process.env.SECRET!);
}

export function verifyToken(token: any) {
	return verify(token, process.env.SECRET!);
}
