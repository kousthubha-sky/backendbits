"use client";

import { DeviconLoader } from "./ui/devicon-loader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DeviconLoader />
      {children}
    </>
  );
}