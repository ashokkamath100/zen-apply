import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContactView from "@/components/UserProfile/Contact/ContactView";
import WorkExperienceView from "@/components/UserProfile/WorkExperience/WorkExperienceView";
import ProfileCardView from "@/components/UserProfile/ProfileCard/ProfileCardView";
import ResumeView from "@/components/UserProfile/Resume/ResumeView";
const Profile = async () => {
  const session = getServerSession();
  if (!session) {
    redirect("/");
  } else {
    console.log("is a session");
  }
  return (
    <div className="mx-auto max-w-screen-xl ">
      <div className="sm:flex sm:flex-col md:grid md:grid-cols-4 md:grid-rows-1 md:grid-flow-row-dense gap-x-4 gap-y-4 gap-2">
        <div className="md:col-start-1 md:col-end-2 md:row-start-1 border border-black">
          <ProfileCardView />
          <div>Job Preferences</div>
          <div>Equal Employment</div>
          <ContactView />
        </div>
        <div className="md:col-start-2 md:col-end-5  border border-black">
          <ResumeView />
          <WorkExperienceView />
          <div>Education</div>
          <div>Projects and Outside Experience</div>
          <div>Portfolio</div>
          <div>Skills</div>
          <div>Languages</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
