export interface JWTPayload {
  sub: string;
  email: string;
  role: "admin" | "viewer";
  iat?: number;
  exp?: number;
}
