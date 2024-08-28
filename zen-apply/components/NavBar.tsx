"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const NavBar = () => {
  const { data: session }: any = useSession();
  return (
    <div className="text-base text-black bg-white w-screen">
      <ul className="flex flex-row justify-between mb-4 items-center">
        <div className="flex flex-row my-4 mx-8 justify-around">
          <div className="text-2xl mx-8">
            <Link href="/">
              <li>ZenApply</li>
            </Link>
          </div>
          <div className="flex flex-row gap-10">
            {session ? (
              <>
                <Link href="/dashboard">
                  <li>🏠 Dashboard</li>
                </Link>
                <Link href="/matches">
                  <li>❤️️ Matches</li>
                </Link>
                <Link href="/jobs">
                  <li>💼 Jobs</li>
                </Link>
                <Link href="/applications">
                  <li>✍ Applications</li>
                </Link>
                <Link href="/companies">
                  <li>🏢 Companies</li>
                </Link>
                <Link href="/documents">
                  <li>📂 Documents</li>
                </Link>
                <Link href="/profile">
                  <li>Profile</li>
                </Link>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
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
          <div className="flex flex-row">
            <div>{session.user?.email}</div>
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
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
