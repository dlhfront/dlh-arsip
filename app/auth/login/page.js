"use client"

import LoginForm from "@/app/components/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const LoginPage = () => {
  const { user } = useAuth();
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);
  return (
    <div className="">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
