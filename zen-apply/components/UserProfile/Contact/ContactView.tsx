'use client'
import React, { useEffect, useState } from 'react' ; 
import { useSession } from 'next-auth/react' ; 
import ContactFormModal from './ContactFormModal';
import Modal from '../Modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export interface contactInfo{
    contactEmail: string,
    phoneNumber: string,
    address: string
}

const ContactView = () => {
    const { data: session } = useSession() ; 
    const [contact,setContact] = useState<contactInfo>({
      contactEmail: "",
      phoneNumber: "",
      address: ""
    }) ; 

    useEffect( () => {
      const fetchContactInfo = async () => {
        if (session) {
          console.log("fetching data") ; 
          fetch('/api/user/contact')
            .then((res) => res.json())
            .then((data) => setContact(data));
        }
      } ; 
      fetchContactInfo() }
      , [session]); 
    
      
      if (!session) {
        return <p>You need to be authenticated to view this content.</p>;
      }
  
      return (
        <Card className='text-sm border border-white rounded-lg shadow-md shadow-white'>
            <div className='flex flex-row justify-between gap-2'>
              <div className='text-lg mx-2'>Contact</div>
              <ContactFormModal setContact={setContact} contact={contact} />
            </div>
            <CardContent>📧 {contact?.contactEmail}</CardContent>
            <CardContent>📞 {contact?.phoneNumber}</CardContent>
            <CardContent>📍 {contact?.address}</CardContent>
        </Card>
  )
}

export default ContactView ; 