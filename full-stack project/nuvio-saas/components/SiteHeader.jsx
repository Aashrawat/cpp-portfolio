"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return <Header />;
}
