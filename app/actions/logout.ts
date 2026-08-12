"use server";

import { redirect } from "next/navigation";
import { clearSessionUser } from "../lib/auth";

export async function logout() {
  await clearSessionUser();
  redirect("/login");
}
