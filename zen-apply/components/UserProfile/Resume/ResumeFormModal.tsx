"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/app/zodSchema/resumeSchema";

type formSchema = z.infer<typeof resumeSchema>;

const ResumeFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [formState, action] = useFormState(actions.saveResume, {
    message: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: file,
    // defaultValues: useMemo(() => {
    //   return contact;
    //   // contactEmail: contact.contactEmail ,
    //   // phoneNumber: phoneNumber,
    //   // address: "1234 jojo street",
    // }, [contact]),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    await action(formData)  ; 
//     try {
//       const response = await fetch("/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("File uploaded successfully!");
//       } else {
//         alert("File upload failed.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Error uploading file.");
//     }
   };
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-transparent" onClick={handleEdit}>✏️</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="fileUpload"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fileUpload">Choose a file:</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="fileUpload"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFileChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please upload your resume file here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Upload File</Button>
        </form>
      </Form>
      </Modal>
    </>
  );
};

export default ResumeFormModal;
