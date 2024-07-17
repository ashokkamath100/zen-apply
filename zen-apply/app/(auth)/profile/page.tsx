import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContactView from "@/components/UserProfile/Contact/ContactView";
import WorkExperienceView from "@/components/UserProfile/WorkExperience/WorkExperienceView";
import ProfileCardView from "@/components/UserProfile/ProfileCard/ProfileCardView";
const Profile = async () => {
  const session = getServerSession();
  if (!session) {
    redirect("/");
  }else{
    console.log("is a session") ; 
  }
  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-4 md:grid-rows-6 md:grid-flow-row-dense gap-x-4 gap-y-4">
      <div className="md:col-start-1 md:col-end-2 md:row-start-1 border border-black">
        <ProfileCardView />
      </div>
      <div className="md:col-start-2 md:col-end-5  border border-black">
        Resume
      </div>
      <div className="md:col-start-2 md:col-end-5 border border-black">
        <WorkExperienceView />
      </div>
      <div className="md:col-start-2 md:col-end-5 border border-black">
        Projects and Outside Experience
      </div>
      <div className="md:col-start-2 md:col-end-5 border border-black">
        Portfolio
      </div>
      <div className="md:col-start-2 md:col-end-5 border border-black">
        Skills
      </div>
      <div className="md:col-start-2 md:col-end-5 border border-black">
        Languages
      </div>
      <div className="md:col-start-1 md:col-end-2 row-start-2 border border-black">
        <ContactView />
      </div>
      <div className="md:col-start-1 md:col-end-2 row-start-3 border border-black">
        Equal Employment
      </div>
      <div className="md:col-start-1 md:col-end-2 row-start-4 border border-black">
        Job Preferences
      </div>
    </div>
  );
};

export default Profile;
