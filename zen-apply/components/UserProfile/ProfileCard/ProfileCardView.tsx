"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileCardFormModal from "./ProfileCardFormModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface profileCardInfo {
  firstName: string;
  lastName: string;
}

const ProfileCardView = () => {
  const { data: session } = useSession();
  const [profileCard, setProfileCard] = useState<profileCardInfo>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      if (session) {
        console.log("fetching data");
        fetch("/api/user/")
          .then((res) => res.json())
          .then((data) => {
            console.log('profilecardview:', data.profile) ; 
            const first = data.profile.firstName ; 
            const last = data.profile.lastName ; 
            console.log('first: ', first) ; 
            console.log('last: ', last) ; 
            const data1 = {first,last }
            const firstLast = {first, last} ; 
            setProfileCard(firstLast) ; 
          }
          );
      }
    };
    fetchContactInfo();
  }, [session]);

  if (!session) {
    return <p>You need to be authenticated to view this content.</p>;
  }

  return (
    <Card className="text-sm border border-white rounded-lg shadow-md shadow-white">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-lg mx-2">Profile</div>
        <ProfileCardFormModal
          setProfileCard={setProfileCard}
          profileCard={profileCard}
        />
      </div>
      <CardContent>
        First Name: {profileCard?.user?.profile.firstName}
      </CardContent>
      <CardContent>Last Name: {profileCard?.lastName}</CardContent>
    </Card>
  );
};

export default ProfileCardView;
