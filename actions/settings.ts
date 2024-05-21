"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "User not found" };
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Settings updated" };
};
