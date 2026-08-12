import { cookies } from "next/headers";

// Mock JWT Payload type
export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

export async function getSessionUser(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get("session_user")?.value;

  if (!sessionData) {
    return null;
  }

  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}

export async function setSessionUser(payload: SessionPayload) {
  const cookieStore = await cookies();
  cookieStore.set("session_user", JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearSessionUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
}
