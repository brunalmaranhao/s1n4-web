'use client'
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@nextui-org/react";

export default function AdminHome() {
  const {handleSignOut} = useAuthContext()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Admin Home</div>
      <Button onPress={handleSignOut}>Sair</Button>

    </main>
  );
}
