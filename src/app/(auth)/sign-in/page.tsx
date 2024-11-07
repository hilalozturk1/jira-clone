"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required")
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log('values :>> ', {values});
} 

function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  });

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
    </Card>
  )
}

export default SignInPage;
