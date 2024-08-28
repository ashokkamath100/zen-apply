import { authenticated } from '../../../../lib/auth';
// app/api/user/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/mongodbConn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);

  

//   if (!session) {
//     console.log("contactInfo api route: no session");
//     return NextResponse.json({ message: "You ain't authorized" }, { status: 401 });
//   }

//   console.log("contact info route hit");
//   const email = session.user._doc.email;

//   await dbConnect();
//   //const user = await User.findOne({ email }).select('profile');
//   const user = await User.findOne({ email }) //.select('profile.contactEmail profile.phoneNumber profile.address');
//   const userJS = user?.toObject() ; 
//   console.log('user in contact route: ' + userJS) ; 
//   console.log('user profile: ' + userJS.email) ; 
//   if (!user) {
//     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   }

//   const { contactEmail, phoneNumber, address } = userJS.profile;

//   return NextResponse.json({ contactEmail, phoneNumber, address }, { status: 200 });
// }

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("contactInfo api route: no session");
    return NextResponse.json({ message: "You ain't authorized" }, { status: 401 });
  }
  console.log("session: " + JSON.stringify(session)) ; 
  console.log("contact info route hit");
  const email = session.user.email; // Adjust to your session structure

  const db = await dbConnect();
  const collection = db.collection('users');

  const user = await collection.findOne({ email }, { projection: { 'profile.contactEmail': 1, 'profile.phoneNumber': 1, 'profile.address': 1 } });
  
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // const { profile: { contactEmail, phoneNumber, address } } = user;
  const contactEmail = user.profile?.contactEmail || 'Not provided';
  const phoneNumber = user.profile?.phoneNumber || 'Not provided';
  const address = user.profile?.address || 'Not provided';

  return NextResponse.json({ contactEmail, phoneNumber, address }, { status: 200 });
}


//export const GET = authenticated(handler);
