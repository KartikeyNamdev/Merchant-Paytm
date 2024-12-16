"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname === href || pathname === `${href}/`;

  return (
    <div
      className={`
        flex items-center gap-4 p-2 pl-8 cursor-pointer 
        ${
          isSelected
            ? "bg-blue-100 text-blue-800 font-semibold"
            : "text-gray-900 hover:bg-gray-100"
        }
      `}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
};
