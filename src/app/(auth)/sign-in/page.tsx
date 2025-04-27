"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas";

import { useLogin } from "@/features/auth/api/use-login";
import { useCurrent } from "@/features/auth/api/use-current";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";

export default function SignInPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["current"] });
  }, [queryClient]);

  const { mutate } = useLogin();
  const { data, isLoading, refetch } = useCurrent();

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      mutate({ json: values });
      setTimeout(async () => {
        await refetch();
      }, 1000);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      router.push("/home");
    }
    // Disable exhaustive deps warning because `user` should not cause re-run
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (!isLoading && !data &&
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex ştems-center justify-center text-center p-5">
        <CardTitle className="text-xl md:text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <Separator />
      </div>
      <CardContent className="py-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="w-full" size="lg" disabled={false}>
              Login
            </Button>
          </form>
        </Form>
        <div className="py-7">
          <Separator />
        </div>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full mb-2"
        >
          <FcGoogle className="mr-2 size-5"></FcGoogle>Login with Google
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5"></FaGithub>Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up" className="text-blue-700">
            &nbsp;Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
