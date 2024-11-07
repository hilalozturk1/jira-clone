"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/api/use-login";

import Link from "next/link";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

function SignInPage() {
  const { mutate } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log('values :>> ', {values});
    mutate({ json: values});
  } 

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex ştems-center justify-center text-center p-5'>
        <CardTitle className='text-xl md:text-2xl'>
          Welcome Back!
        </CardTitle>
      </CardHeader>  
      <div className='px-7 mb-2'>
        <Separator/>
      </div>
      <CardContent className='py-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field}
                      type='email'
                      placeholder='Enter email address'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}>
            </FormField>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field}
                      type='password'
                      placeholder='Enter password'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}>
            </FormField>
            <Button className='w-full' size="lg" disabled={false}>Login</Button>
          </form>
        </Form>
        <div className="py-7">
            <Separator/>
          </div>
        <Button disabled={false} variant="secondary" size="lg" className='w-full mb-2'>
          <FcGoogle className="mr-2 size-5"></FcGoogle>Login with Google</Button>
        <Button disabled={false} variant="secondary" size="lg" className='w-full'>
          <FaGithub className="mr-2 size-5"></FaGithub>Login with Github</Button>
      </CardContent>
      <div className="px-7">
        <Separator/>
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up" className="text-blue-700">&nbsp;Sign Up</Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInPage;
