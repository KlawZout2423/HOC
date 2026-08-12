import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "../types/auth";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-this-secret-in-production"
);

const EXPIRES_IN = "8h";

// Sign
export async function signToken(payload: Omit<JWTPayload, "iat" | "exp">) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(SECRET);
}

// Verify
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// Decode without verify
export function decodeToken(token: string): JWTPayload | null {
  try {
    const base64 = token.split(".")[1];
    const json = Buffer.from(base64, "base64url").toString("utf8");
    return JSON.parse(json) as JWTPayload;
  } catch {
    return null;
  }
}
