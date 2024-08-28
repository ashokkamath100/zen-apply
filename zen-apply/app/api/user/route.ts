// import { NextRequest, NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI!;
// const client = new MongoClient(uri);
// // Mock data for demonstration purposes
// const mockUserData = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Jane Doe' }
// ];

// // Helper function to set CORS headers
// function setCORSHeaders(response: NextResponse) {
//   response.headers.set('Access-Control-Allow-Origin', '*'); // Allow any origin
//   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
// }

// // GET method
// export async function GET() {
//   //const response = NextResponse.json(mockUserData, { status: 200 });
//   //setCORSHeaders(response);
//   //console.log("request: " + JSON.stringify(req)) ; 
//   console.log("here") ;
//   await client.connect();
//   const database = client.db("zen-apply");
//   const jobPostings = database.collection<JobPosting>("jobs");

//   //return new NextResponse("user hi", {status: 200});
//     //return NextResponse.json({"key": 'fucking work'}) ; 
//     const jsonResponse = Response.json(mockUserData) ;
//     return jsonResponse ; 
//   //return res.status(200).json(mockUserData);

// }

// // POST method
// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   // Assuming body contains user data to be added
//   //return new NextResponse("user is registered", {status: 200})
//   mockUserData.push(body);

//   const response = NextResponse.json({ message: 'User added successfully' }, { status: 201 });
//   setCORSHeaders(response);
//   return response;
// }

// // OPTIONS method to handle preflight requests
// export async function OPTIONS(req: NextRequest) {
//   const response = NextResponse.json(null, { status: 204 });
//   setCORSHeaders(response);
//   return response;
// }


import { authenticated } from '../../../lib/auth';
// app/api/user/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/mongodbConn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  console.log('user route hit') 
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("contactInfo api route: no session");
    return NextResponse.json({ message: "You ain't authorized" }, { status: 401 });
  }

  console.log("contact info route hit");
  const email = session.user.email;


  const db = await dbConnect();
  const collection = db.collection('users');

  const user = await collection.findOne({ email }, { projection: { 'profile': 1} });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  //const { profile: { workExperiences } } = user;

  const profile = user.profile || 'Not provided' ; 
  const firstName = user.profile?.firstName || 'Not provided';
  const lastName = user.profile?.lastName || 'Not provided';

  return NextResponse.json({profile}, { status: 200 });
}

//export const GET = authenticated(handler);

