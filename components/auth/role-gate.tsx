"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

import React from "react";
import { FormError } from "../form-error";

function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();
  if (role !== allowedRole)
    return (
      <FormError message="You do not have permission to view this content"></FormError>
    );
  return <> {children} </>;
}

export default RoleGate;
