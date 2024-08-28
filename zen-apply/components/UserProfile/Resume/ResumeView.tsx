"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ResumeFormModal from "./ResumeFormModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const ResumeView = () => {
  return (
    <Card className="text-sm border border-white rounded-lg shadow-md shadow-white">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-lg mx-2">Resume</div>
        <ResumeFormModal
        //   setProfileCard={setProfileCard}
        //   profileCard={profileCard}
        />
      </div>
      <CardContent></CardContent>
      <CardContent></CardContent>
    </Card>
  );
};

export default ResumeView;
