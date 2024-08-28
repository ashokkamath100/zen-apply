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
import { useSession } from 'next-auth/react' ; 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


interface EducationModalProps {
  workExperience: workExpI;
  workExpId: number;
}

type formSchema = z.infer<typeof workExpSchema>;

const NewEducationFormModal: FC<EducationModalProps> = ({
  workExpId,
  workExperience: workExperience,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, action] = useFormState(actions.saveWorkExperience, {
    message: "",
  });

//   const [workExp, setWorkExp] = useState<workExpI>({
//     ...workExperience,
//   });
  const { data: session } = useSession() ; 


  const form = useForm<formSchema>({
    resolver: zodResolver(workExpSchema),
    defaultValues: workExperience,
    // defaultValues: useMemo(() => {
    //   return contact;
    //   // contactEmail: contact.contactEmail ,
    //   // phoneNumber: phoneNumber,
    //   // address: "1234 jojo street",
    // }, [contact]),
  });

  const onSubmit = async (data: formSchema) => {
    console.log("onsubmit running");

    const formData = new FormData();
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("positionTitle", data.positionTitle);
    formData.append("experienceType", data.experienceType) ; 
    formData.append("startMonth", data.startMonth) ; 
    formData.append("startYear", data.startYear) ; 
    formData.append("endMonth", data.endMonth) ; 
    formData.append("endYear", data.endYear) ;
    formData.append("workExpId", String(workExpId));
    await action(formData);
    //setWorkExp(data);
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
      <Button className="bg-transparent" onClick={handleEdit}>
        ✏️
      </Button>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default NewEducationFormModal;
