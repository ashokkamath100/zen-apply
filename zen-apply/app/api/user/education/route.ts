
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/mongodbConn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("contactInfo api route: no session");
    return NextResponse.json({ message: "You ain't authorized" }, { status: 401 });
  }

  console.log("contact info route hit");
  const email = session.user.email;


  const db = await dbConnect();
  const collection = db.collection('users');

  const user = await collection.findOne({ email }, { projection: { 'profile.education': 1} });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  //const { profile: { workExperiences } } = user;
  const workExperiences = user.profile?.workExperiences || "Not provided" ; 

  return NextResponse.json({workExperiences}, { status: 200 });
}