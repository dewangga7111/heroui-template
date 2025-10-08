import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="flex-grow px-3 py-6 overflow-y-auto bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
