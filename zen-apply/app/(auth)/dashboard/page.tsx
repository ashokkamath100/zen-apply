import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import JobCard from "@/components/JobCard";

const Dashboard = async () => {
  const session = getServerSession();

  if (!session) {
    console.log("no session");
    redirect("/");
  } else {
    console.log("is session: " + JSON.stringify(session));
  }
  return (
    <div className="max-w-screen-2xl my-8 mx-auto min-h-screen flex flex-col gap-8">
      <div>
        <div> Welcome Back!</div>
        <div>Check out your top matches and saved jobs down below!</div>
      </div>
      <div className="text-left">
        <div className="text-lg">Top Matches</div>
        <div className="flex flex-row gap-4">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
      <div>
        <div className="text-lg">Saved Jobs</div>
        <div className="flex flex-wrap gap-4">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />

        </div>
      </div>
      <div>
        <div className="text-lg">Recently Viewed</div>
        <div className="flex  flex-wrap gap-4">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
