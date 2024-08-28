"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WorkExperienceFormModal from "./WorkExperienceFormModal";
import Modal from "../Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewWorkExpFormModal from "./NewWorkExpFormModal";

export interface workExpI {
  id: number;
  company: string;
  location: string;
  positionTitle: string;
  experienceType: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

const WorkExperienceView = () => {
  const { data: session } = useSession();
  const [workExperiences, setWorkExperiences] = useState<workExpI[]>([]);

  useEffect(() => {
    const fetchWE = async () => {
      if (session) {
        const workExps = await fetch("/api/user/workExperiences");
        const workExpsJson = await workExps.json();
        console.log("workExp from JSON");
        console.log(workExpsJson.workExperiences);
        // Ensure the response is converted to an array
        if (Array.isArray(workExpsJson)) {
          console.log("using array");
        } else if (workExpsJson && typeof workExpsJson === "object") {
          console.log("object path");
          if (workExpsJson.workExperiences !== undefined) {
            setWorkExperiences(workExpsJson.workExperiences);
          }
        } else {
          console.error(
            "Fetched work experiences is not an array or an object:",
            workExpsJson
          );
          setWorkExperiences([]); // Ensure it's an array
        }
      }
    };
    fetchWE();
  }, [session]);

  //use to delete or add work exp
  //method inside workExpFormModal can be used to
  //update
  // const updateWorkExperiences = (id: number, new) => {

  // }

  return (
    <Card className="text-sm border border-white rounded-lg shadow-md shadow-white">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-lg mx-2">Work Experience</div>
        <NewWorkExpFormModal
          workExpId={workExperiences.length}
          setWorkExperiences={setWorkExperiences}
          workExperiences={workExperiences}
        />
      </div>
      <div className="flex flex-col">
        {Array.isArray(workExperiences) ? 
          workExperiences.map((experience) => {
            console.log("experience: " + JSON.stringify(experience));
            console.log("expereince.company:" + experience.company);
            return (
              <WorkExperienceFormModal
                workExpId={experience.id}
                //workExperience={experience}
              />
            );
          }) : <div></div>}
      </div>
    </Card>
  );
};

export default WorkExperienceView;
