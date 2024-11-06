"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function SignInPage() {
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
        <form className='space-y-4'>
          <Input 
            required
            type='email'
            value={""}
            onChange={() => {}}
            placeholder='Enter email address'
            disabled={false}
          />
          <Input 
            required
            type='password'
            value={""}
            onChange={() => {}}
            placeholder='Enter password'
            disabled={false}
            min={8}
            max={256}
          />
          <Button className='w-full' size="lg" disabled={false}>Login</Button>
        </form>
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
