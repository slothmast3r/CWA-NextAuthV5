"use server"

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login= (values: z.infer<typeof LoginSchema>) => {
const validatedFields =LoginSchema.safeParse(values);

if (!validatedFields.success) {
    console.log(validatedFields.error.errors);
    return;
}
}