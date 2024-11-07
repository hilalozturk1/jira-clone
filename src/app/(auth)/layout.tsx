"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode
}

function AuthLayout({children}: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="min-h-screen bg-gradient-to-t from-indigo-50 to-blue-500">
        <div className="mx-auto max-w-screen-2xl p-4">
            <nav className="flex justify-between items-center">
                <Image src="../logo.svg" width={35} height={35} alt="logo"/>
                <Button asChild variant="secondary" className="font-semibold">
                    <Link href={ isSignIn ? "/sign-up" : "/sign-in"}>
                        { isSignIn ? "Sign Up" : "Login" }
                    </Link>
                </Button>
            </nav>
            <div className="flex flex-col justify-center items-center md:pt-14 pt-4">
                {children}
            </div>
        </div>
    </main>
  )
}

export default AuthLayout
