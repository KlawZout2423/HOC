"use server";

import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { setSessionUser } from "../lib/auth";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Safety net for prototyping: if DB is empty, create the default admin user
  const userCount = await prisma.user.count();
  if (userCount === 0 && email === "admin@vrhc.gov.gh") {
    let adminRole = await prisma.role.findUnique({ where: { name: "Administrator" } });
    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: { name: "Administrator", description: "Default Admin" },
      });
    }
    await prisma.user.create({
      data: {
        email: "admin@vrhc.gov.gh",
        password: "adminpassword",
        roleId: adminRole.id,
      },
    });
  }

  // Find the user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  // Set the session
  await setSessionUser({
    userId: user.id,
    email: user.email,
    role: user.role?.name || "user",
  });

  redirect("/dashboard");
}
