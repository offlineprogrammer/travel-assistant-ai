"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import type { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return <Authenticator>{children}</Authenticator>;
}
