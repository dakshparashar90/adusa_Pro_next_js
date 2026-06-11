import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "@/src/app/dashboard/DashboardClient";

export default async function DashboardPage() {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user?.profileCompleted) {
    redirect("/profile");
  }

  return (
    <DashboardClient
      email={session.user.email}
    />
  );
}