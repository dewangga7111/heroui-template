"use client";

import AppTextInput from "@/components/common/app-text-input";
import { Button, Card, CardBody, Form, Image } from "@heroui/react";
import { form, title } from "@/utils/primitives";
import { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Footer from "@/components/footer";
import logo from "@/assets/images/logo.png"

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => setMounted(true), []);

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
              <Form onSubmit={() => { }}>
                <AppTextInput
                  isRequired
                  key='email'
                  name='email'
                  label='Email'
                  type="email"
                />
                <AppTextInput
                  isRequired
                  key='password'
                  name='password'
                  label='Password'
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
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
