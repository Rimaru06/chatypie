"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providerss({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
