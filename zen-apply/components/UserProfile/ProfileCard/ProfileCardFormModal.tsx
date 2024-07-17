"use client";
import { useState, FC, useMemo } from "react";
import Modal from "../Modal";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { IntegerType } from "mongodb";
import { profileCardInfo } from "@/components/UserProfile/ProfileCard/ProfileCardView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { profileCardSchema } from "@/app/zodSchema/profileCardSchema";

interface ProfileModalProps {
  setProfileCard: (data: profileCardInfo) => void;
  profileCard: profileCardInfo;
}
type formSchema = z.infer<typeof profileCardSchema>;

const ProfileCardFormModal: FC<ProfileModalProps> = ({
  setProfileCard,
  profileCard
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, action] = useFormState(actions.saveProfileInfo, {
    message: "",
  });

  console.log("contactInformation: " + JSON.stringify(profileCard));
  console.log("contactInfo - phoneNumber: " + profileCard.lastName);
//   let phoneNumber = contact.phoneNumber;
  const form = useForm<formSchema>({
    resolver: zodResolver(profileCardSchema),
    defaultValues: profileCard 
  });

  const [formInfo, setFormInfo] = useState<profileCardInfo>();


  const onSubmit = async (data: formSchema) => {
    console.log("onsubmit running");

    const formData = new FormData() ; 
    formData.append("firstName", data.firstName) ; 
    formData.append("lastName", data.lastName) ; 
    await action(formData) ; 
    setProfileCard(data) ; 
    setIsModalOpen(false) ; 
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
        <h2 className="text-2xl mb-4">Edit Form</h2>
        <Form {...form}>
          <form action={action} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your last name</FormDescription>
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

export default ProfileCardFormModal;



