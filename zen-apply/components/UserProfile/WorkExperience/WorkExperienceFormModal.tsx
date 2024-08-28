"use client";
// components/EditButton.tsx
import { useState, FC, useMemo, useEffect } from "react";
import Modal from "../Modal";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { IntegerType } from "mongodb";
import { workExpI } from "@/components/UserProfile/WorkExperience/WorkExperienceView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { workExpSchema } from "@/app/zodSchema/workExpSchema";
import { useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WorkExperienceModalProps {
  //workExperience: workExpI;
  workExpId: string;
}

type formSchema = z.infer<typeof workExpSchema>;

const WorkExperienceFormModal: FC<WorkExperienceModalProps> = ({
  workExpId,
  // workExperience: workExperience,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, action] = useFormState(actions.saveWorkExperience, {
    message: "",
  });

  console.log("key prop: " + workExpId);
  //console.log('workExperience prop: ' + workExperience.company)

  const [workExp, setWorkExp] = useState<workExpI>();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWE = async () => {
      if (session) {
        const workExps = await fetch("/api/user/workExperiences");
        let workExpsJson = await workExps.json();
        console.log("logging workExps");
        console.log(workExpsJson.workExperiences);
        const wExpArray = workExpsJson.workExperiences;
        console.log("key: " + workExpId);
        const workExpResp = wExpArray.filter((exp) => exp.id === workExpId);
        console.log("executing filtering");
        console.log(workExpResp);
        console.log(workExpResp[0]);
        setWorkExp(workExpResp[0]);

        console.log("workExp: " + JSON.stringify(workExp));
      }
    };
    fetchWE();
  }, [session]);

  const form = useForm<formSchema>({
    resolver: zodResolver(workExpSchema),
    defaultValues: workExp,
    // defaultValues: useMemo(() => {
    //   return contact;
    //   // contactEmail: contact.contactEmail ,
    //   // phoneNumber: phoneNumber,
    //   // address: "1234 jojo street",
    // }, [contact]),
  });

  useEffect(() => {
    if (workExp) {
      form.reset(workExp);
    }
  }, [workExp, form]);

  const onSubmit = async (data: formSchema) => {
    console.log("onsubmit running");

    const formData = new FormData();
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("positionTitle", data.positionTitle);
    formData.append("experienceType", data.experienceType);
    formData.append("startMonth", data.startMonth);
    formData.append("startYear", data.startYear);
    formData.append("endMonth", data.endMonth);
    formData.append("endYear", data.endYear);
    formData.append("description", data.description);
    formData.append("workExpId", String(workExpId));
    await action(formData);
    setWorkExp(data);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row flex-wrap">
          <CardContent>Company: {workExp?.company}</CardContent>
          <CardContent>Location: {workExp?.location}</CardContent>
          <CardContent>Position Title: {workExp?.positionTitle}</CardContent>
          <CardContent>Experience Type: {workExp?.experienceType}</CardContent>
          <CardContent>Start Month: {workExp?.startMonth}</CardContent>
          <CardContent>Start Year: {workExp?.startYear}</CardContent>
          <CardContent>End Month: {workExp?.endMonth}</CardContent>
          <CardContent>End Year: {workExp?.endYear}</CardContent>
          <CardContent>Description: {workExp?.description}</CardContent>

        </div>
        <Button
          className="inline bg-transparent right-0"
          onClick={handleEdit}
          title="Edit work experience"
        >
          ✏️
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl mb-4">Edit Form</h2>
        <Form {...form}>
          <form
            className=""
            action={action}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-row justify-around gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Company</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Work experience location</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-around gap-4">
              <FormField
                control={form.control}
                name="positionTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>positionTitle</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Your position title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Type</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Experience type</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-around gap-4">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Month</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Start Month</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Start Year</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Month</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>End Month</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>End Year</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default WorkExperienceFormModal;
