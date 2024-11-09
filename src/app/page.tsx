"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-logout";
import { useCurrent } from "@/features/auth/api/use-current";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { mutate } = useLogout();
  const { data, isLoading } = useCurrent();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data])

  return (
    <div>
      Only visible to authorized users.
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
