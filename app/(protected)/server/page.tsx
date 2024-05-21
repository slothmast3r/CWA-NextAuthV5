import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

async function ServerPage() {
  const user = await currentUser();
  return <UserInfo label="Server component" user={user}></UserInfo>;
}

export default ServerPage;
