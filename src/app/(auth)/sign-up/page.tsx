"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Card, 
  CardContent, 
  CardDescription, 
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

const formSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(8, "Min 8 required")
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log('values :>> ', {values});
} 

function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: ""
    },
  });
  
  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex ştems-center justify-center text-center p-5'>
        <CardTitle className='text-xl md:text-2xl'>
          Sign Up!
        </CardTitle>
        <CardDescription>
          By signin up, you agree to our {" "}
          <Link href="/privacy">
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}and{" "}
          <Link href="/terms">
            <span className="text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>  
      <div className='px-7 mb-2'>
        <Separator/>
      </div>
      <CardContent className='py-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      {...field}
                      type='text'
                      placeholder='Enter your name'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}>
            </FormField>
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
        <Button 
          disabled={false} 
          variant="secondary" 
          size="lg" 
          className='w-full mb-2'
        >
          <FcGoogle className="mr-2 size-5"></FcGoogle>
            Login with Google
          </Button>
        <Button 
          disabled={false} 
          variant="secondary" 
          size="lg" 
          className='w-full'
          >
          <FaGithub className="mr-2 size-5"></FaGithub>
            Login with Github
          </Button>
      </CardContent>
      <div className="px-7">
        <Separator/>
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?
          <Link href="/sign-in" className="text-blue-700">&nbsp;Sign In</Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUpPage