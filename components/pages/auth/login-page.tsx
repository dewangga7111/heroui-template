"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Card, Form } from "@heroui/react";
import { isMobile } from "react-device-detect";

import AppTextInput from "@/components/forms/app-text-input";
import AppTextInputPassword from "@/components/forms/app-text-input-password";
import Footer from "@/components/footer";
import { showSuccessToast } from "@/utils/common";
import { BlurText } from "@/components/animations/blur-text";
import { SplitText } from "@/components/animations/split-text";
import { ShinyText } from "@/components/animations/shiny-text";

const APP_NAME = process.env.NEXT_PUBLIC_WEB_TITLE || "MyApp";
const APP_TAGLINE = process.env.NEXT_PUBLIC_WEB_TAGLINE || "Manage your workspace with ease";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      showSuccessToast("Login Successfully");
      router.push("/");
      setLoading(false);
    }, 800);
  };

  const formFields = (
    <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <AppTextInput
        isRequired
        name="email"
        label="Email"
        type="email"
        placeholder="admin@mail.com"
        isDisabled={loading}
      />
      <AppTextInputPassword
        isRequired
        name="password"
        label="Password"
        placeholder="Enter your password"
        isDisabled={loading}
      />
      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isDisabled={loading}
      >
        <LogIn size={15} />
        {loading ? "Signing in..." : "Login"}
      </Button>
    </Form>
  );

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="flex flex-col justify-between px-5 h-screen py-10">
        <div className="flex items-center justify-center">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-300">
            {APP_NAME}
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col mb-8">
            <ShinyText className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-primary-600 to-primary-300">
              Welcome Back
            </ShinyText>
            <span className="text-sm text-muted mt-3">
              Enter your email and password to access your account
            </span>
          </div>
          {formFields}
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full w-full bg-default-50">
      <Card className="max-w-5xl w-[90%] h-[75%] shadow-2xl p-0">
        <Card.Content className="grid grid-cols-2 p-0 h-full overflow-hidden gap-0">
          {/* Left gradient panel */}
          <div className="w-full h-full bg-gradient-to-br from-primary-700 via-primary-500 to-primary-300 rounded-l-xl relative overflow-hidden flex flex-col justify-between p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
            <div className="relative z-10">
              <div className="text-4xl font-bold text-white">
                <BlurText duration={0.8} delay={0.2} splitBy="characters">
                  {APP_NAME}
                </BlurText>
              </div>
              <div className="text-sm text-white/80 mt-3">
                <SplitText duration={0.5} delay={0.6} splitBy="words">
                  {APP_TAGLINE}
                </SplitText>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="flex flex-col flex-1">
            <div className="w-full px-10 flex-grow flex flex-col justify-center">
              <div className="flex flex-col mb-8">
                <ShinyText className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-primary-600 to-primary-400">
                  Welcome Back
                </ShinyText>
                <span className="text-sm text-muted mt-2">
                  Enter your email and password to access your account
                </span>
              </div>
              {formFields}
            </div>
            <Footer />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
