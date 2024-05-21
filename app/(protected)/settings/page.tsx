"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { logout } from "@/actions/logout";
import { signOut, useSession } from "next-auth/react";
import React, { useTransition } from "react";

export default function SettigsPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const onClick = () => {
    startTransition(() => {
      settings({ name: "lol" }).then(() => {
        update();
      });
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
}
