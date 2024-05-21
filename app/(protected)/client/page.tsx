"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

function ServerPage() {
  const user = useCurrentUser();
  return <UserInfo label="Client component" user={user}></UserInfo>;
}

export default ServerPage;
