"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const AdminNavbar = () => {
  const pathName = usePathname();

  const segments = pathName.split("/").filter(Boolean);

  return (
    <div className="flex justify-between px-5 p-4 shadow-sm sticky top-0 z-50 bg-background items-center">
      <div className="flex items-center space-x-4">
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment: string, index: number) => {
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">{segment}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== segments.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-5">
        <Bell />
        <ShoppingCart className="cursor-pointer" />
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={""} alt="" />
          <AvatarFallback className="rounded-lg uppercase">
            {/* {session?.user?.username.at(0)} */} R
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AdminNavbar;
