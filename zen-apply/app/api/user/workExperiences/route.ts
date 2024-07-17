// import { authenticated } from '../../../../lib/auth';
// // app/api/user/contact/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongoose';
// import { User } from '@/mongoose/User';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

  

//   if (!session) {
//     console.log("contactInfo api route: no session");
//     return NextResponse.json({ message: "You ain't authorized" }, { status: 401 });
//   }

//   console.log("contact info route hit");
//   const email = session.user._doc.email;

//   await dbConnect();
//   const user = await User.findOne({ email }).select('workExperiences');

//   if (!user || !user.workExperiences) {
//     return NextResponse.json({ message: 'Work experiences not found' }, { status: 404 });
//   }

//   return NextResponse.json(user?.workExperiences, { status: 200 });
// }

//export const GET = authenticated(handler);

//import { authenticated } from '../../../lib/auth';
// app/api/user/contact/route.ts
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

  const user = await collection.findOne({ email }, { projection: { 'profile.workExperiences': 1} });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  //const { profile: { workExperiences } } = user;
  const workExperiences = user.profile?.workExperiences || "Not provided" ; 

  return NextResponse.json({workExperiences}, { status: 200 });
}