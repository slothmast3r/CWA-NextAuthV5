"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
// import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import React from "react";

export default function SettigsPage() {
  const session = useCurrentUser();

  const onClick = () => {
    signOut();
    // logout()
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <form>
        <button type="submit" onClick={onClick}>
          Sign out
        </button>
      </form>
    </div>
  );
}
