"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);
  if (!exisitingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date() > new Date(exisitingToken.expires);
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(exisitingToken.email);
  if (!existingUser) {
    return { error: "Email not found" };
  }

  await db.user.update({
    where: {
      email: exisitingToken.email,
    },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: exisitingToken.id,
    },
  });

  return { success: "Email verified" };
};
