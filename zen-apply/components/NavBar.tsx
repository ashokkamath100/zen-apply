"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const NavBar = () => {
  const { data: session }: any = useSession();
  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex flex-row gap-10">
          {session ? (
            <>
                <Link href="/dashboard">
                    <li>Dashboard</li>
                </Link>
                <Link href="/profile">
                    <li>Profile</li>
                </Link>
            </>
          ) : (
            <div></div>
          )}
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/signup">
                <li>Sign Up</li>
              </Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                    redirect("/");
                  }}
                  className="p-2 px-5 mt-1 bg-blue-800 rounded-full hover:bg-blue-500"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
