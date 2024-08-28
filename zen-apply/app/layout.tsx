// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <title>Job Application Automator</title>
        <meta
          name="description"
          content="Automate your job applications with ease."
        />
      </head>
      <body className="bg-gradient-to-b from-redLight to-redDark text-white">
        <SessionProvider session={session}>
          <NavBar />
          <div className="text-2xl gap-2 mb-4">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
