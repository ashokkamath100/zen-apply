import CoverLetterGen from "@/components/CoverLetterGen";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import JobCard from "@/components/JobCard";
import React from 'react'

const page = () => {
    const session = getServerSession() ; 

    if(!session){
        redirect('/') ; 
    }else{
        
    }
  return (
    <div>
        <CoverLetterGen />
    </div>
  )
}

export default page