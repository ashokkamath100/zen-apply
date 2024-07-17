"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WorkExperienceFormModal from "./EducationFormModal";
import Modal from "../Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewWorkExpFormModal from "./NewEducationFormModal";
import EducationFormModal from "./EducationFormModal";

const EducationView = () => {
  const { data: session } = useSession();

  const [educations, setEducation] = useState([]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      if (session) {
        console.log("fetching data");
        fetch("/api/user/")
          .then((res) => res.json())
          .then((data) => setEducation(data));
      }
    };
    fetchContactInfo();
  }, [session]);

  return (
    <Card className="text-sm border border-white rounded-lg shadow-md shadow-white">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-lg mx-2">Work Experience</div>
        <EducationFormModal
          workExpId={workExperiences.length}
          setWorkExperiences={setWorkExperiences}
          workExperiences={workExperiences}
        />
      </div>
      <div className="flex flex-col">
        {educations.map((education) => {
          console.log("experience: " + JSON.stringify(education));
          console.log("expereince.company:" + experience.company);
          return (
            <WorkExperienceFormModal
              workExpId={experience.id}
              //workExperience={experience}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default EducationView;
