import React from 'react'
import { getServerSession } from "next-auth" ; 
import { redirect } from "next/navigation" ; 
import { useSession } from 'next-auth/react';

const Dashboard = async () => {
  const session = getServerSession() ; 

  if(!session){
    console.log("no session") ; 
    redirect("/") ; 
  }else{
    console.log("is session: " + JSON.stringify(session)) ; 
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      Dashboard
    </div>
  )
}

export default Dashboard