import { hashSync, compareSync } from "bcryptjs";

export function hashPassword(password: string): string {
	return hashSync(password, 2);
}

export function comparePassword(password: string, hash: string): boolean {
	return compareSync(password, hash);
}
