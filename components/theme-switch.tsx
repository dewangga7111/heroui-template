"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { Tooltip } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <button
          onClick={toggle}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          className={`cursor-pointer px-1 transition-opacity hover:opacity-80 flex items-center justify-center ${className ?? ""}`}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {isDark ? "Light Mode" : "Dark Mode"}
      </Tooltip.Content>
    </Tooltip>
  );
};
