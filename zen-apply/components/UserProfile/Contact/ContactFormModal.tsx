"use client";
import { useState, FC } from "react";
import Modal from "../Modal";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { contactInfo } from "@/components/UserProfile/Contact/ContactView";
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
import { contactInfoSchema } from "@/app/zodSchema/contactInfoSchema";

interface ContactModalProps {
  setContact: (data: contactInfo) => void;
  contact: contactInfo;
}
type formSchema = z.infer<typeof contactInfoSchema>;

const ContactFormModal: FC<ContactModalProps> = ({
  setContact,
  contact,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, action] = useFormState(actions.saveContactInfo, {
    message: "",
  });

  console.log("contactInformation: " + JSON.stringify(contact));
  console.log("contactInfo - phoneNumber: " + contact.phoneNumber);
  let phoneNumber = contact.phoneNumber;
  const form = useForm<formSchema>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: contact 
    // defaultValues: useMemo(() => {
    //   return contact;
    //   // contactEmail: contact.contactEmail ,
    //   // phoneNumber: phoneNumber,
    //   // address: "1234 jojo street",
    // }, [contact]),
  });

  const [formInfo, setFormInfo] = useState<contactInfo>();


  const onSubmit = async (data: formSchema) => {
    console.log("onsubmit running");

    const formData = new FormData() ; 
    formData.append("contactEmail", data.contactEmail) ; 
    formData.append("phoneNumber", data.phoneNumber) ; 
    formData.append("address", data.address) ; 
    await action(formData) ; 
    setContact(data) ; 
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
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your contact email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your phone number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your address</FormDescription>
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

export default ContactFormModal;



