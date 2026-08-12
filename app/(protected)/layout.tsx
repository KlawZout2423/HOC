import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getSessionUser } from "../lib/auth";
import { Sidebar } from "./Sidebar";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="app-shell">
      <Sidebar user={user} />
      <section className="content">{children}</section>
    </div>
  );
}
