"use client";

import React, { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already registered with another account"
      : "";

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      login(values)
        .then((result) => {
          if (result?.error) {
            form.reset();
            setError(result.error);
          }
          if (result?.success) {
            form.reset();
            setSuccess(result.success);
          }
          if (result?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError("An error occurred");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      showSocial
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                {" "}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="exam@ple.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="*****"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormError message={error || urlError}></FormError>
            <FormSuccess message={success}></FormSuccess>
            <Button disabled={isPending} type="submit" className="w-full">
              {showTwoFactor ? "Verify code" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
