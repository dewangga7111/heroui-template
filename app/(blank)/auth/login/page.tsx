"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

import AppTextInput from "@/components/common/app-text-input";
import { Button, Card, CardBody, Form, Image } from "@heroui/react";
import Footer from "@/components/footer";
import logo from "@/assets/images/logo.png"
import AppTextInputPassword from "@/components/common/app-text-input-password";
import { showSuccessToast } from "@/utils/common";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    showSuccessToast('Login successfully')
    router.push("/")
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[70%] h-[85%] shadow-2xl">
        <CardBody className="grid grid-cols-2 p-0 h-full">
          <div className="w-full h-full bg-[url('https://heroui.com/images/hero-card-complete.jpeg')] bg-cover bg-center rounded-l-xl">
          </div>
          <div className="flex flex-col justify-between px-5 pt-5">
            <div className="absolute right-3">
              <Image src={logo.src} alt="Logo" height={70} />
            </div>
            <div></div>
            <div className="w-full px-15">
              <div className="flex flex-col justify-center items-center mb-12">
                <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary-300">Welcome Back</span>
                <span className="text-sm text-default-600 mt-3">Enter your email and password to access your account</span>
              </div>
              <Form onSubmit={handleSubmit}>
                <AppTextInput
                  isRequired
                  key='email'
                  name='email'
                  label='Email'
                  type="email"
                />
                <AppTextInputPassword
                  isRequired
                  key='password'
                  name='password'
                  label='Password'
                />
                <Button
                  type="submit"
                  color="primary"
                  className="w-full mt-5"
                  startContent={<LogIn size={15} />}
                >
                  Login
                </Button>
              </Form>
            </div>
            <Footer />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
