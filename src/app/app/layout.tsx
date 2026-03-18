import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { AppSidebarNav } from "@/components/app-sidebar-nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <AppSidebarNav />
          <main className="mt-6 min-w-0 flex-1 sm:mt-0">{children}</main>
        </div>
      </div>
    </>
  );
}
