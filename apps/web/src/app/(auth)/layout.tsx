import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Notes</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

