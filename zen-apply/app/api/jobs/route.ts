// app/api/job_posting/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);



export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const database = client.db("zen-apply");
    const jobPostings = database.collection<JobPosting>("jobs");

    const jobPosting = await jobPostings.findOne(
      { "company": "Boston Red Sox" },
      {
        projection: {
          _id: 0, 
          company: 1, 
          job_posting: 1
        },
      }
    );

    if (!jobPosting) {
      return NextResponse.json({ message: "Job posting not found" }, { status: 404 });
    } else {
      return NextResponse.json(jobPosting, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
