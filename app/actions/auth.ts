"use server";

import { redirect } from "next/navigation";
import { setSessionUser } from "../lib/auth";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Bypass database check for UI demo/inspection
  await setSessionUser({
    userId: "mock-admin-id",
    email: email || "admin@vrhc.gov.gh",
    role: "Administrator",
  });

  redirect("/dashboard");
}
