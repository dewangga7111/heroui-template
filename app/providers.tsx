"use client";

import { PermissionProvider } from "@/context/permission-context";
import { ConfirmationProvider } from "@/context/confirmation-context";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { ReduxProvider } from "@/redux/providers";
import { Toast } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ReduxProvider>
      <Toast.Provider placement="top end" />
      <NextThemesProvider {...themeProps}>
        <ConfirmationProvider>
          <PermissionProvider>
            {children}
          </PermissionProvider>
        </ConfirmationProvider>
      </NextThemesProvider>
    </ReduxProvider>
  );
}
