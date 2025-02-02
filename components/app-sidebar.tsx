import * as React from "react";
import Link from "next/link";
import { LayoutDashboard } from 'lucide-react';
import { FilePenLine } from 'lucide-react';
import { auth } from "@/lib/auth";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();

  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="flex gap-4 p-2 pt-8 ">
        <Link
          href="/dashboard"
          className="flex flex-row items-center gap-2 "
        >
          {/* Ícone da rota */}
          <LayoutDashboard color="#000" size={28} />

          {/* Nome da rota (esconde quando a sidebar estiver colapsada) */}
          <span className="font-normal text-xl text-black group-data-[collapsible=icon]:hidden">
            Dashboard
          </span>
        </Link>
        <Link
          href="/notes"
          className="flex flex-row items-center gap-2 "
        >
          {/* Ícone da rota */}
          <FilePenLine color="#000" size={28} />

          {/* Nome da rota (esconde quando a sidebar estiver colapsada) */}
          <span className="font-normal text-xl text-black group-data-[collapsible=icon]:hidden">
            Notes
          </span>
        </Link>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
