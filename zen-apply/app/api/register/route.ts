//import User from "@/mongoose/User";
import { User,IUser } from "@/mongoose/User" ; 
import connect from "@/lib/mongoose";
import bcrypt from "bcryptjs" ; 
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {email, password} = await request.json() ; 

    await connect() ;  
    // if (!connection) {
    //     throw new Error("No connection available");
    // }
//    const User = createUserModel(connection) ; 

    //const jobPostings = database.collection<JobPosting>("jobs");

    const existingUser = await User.findOne({email}) ; 
    if(existingUser){
        return new NextResponse("Email is already in use", {
            status: 400
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5) ; 
    const newUser = new User({
        email, 
        password: hashedPassword
    })

    try {
        await newUser.save() ; 
        return new NextResponse("user is registered", {status: 200})


    } catch (err: any){
        return new NextResponse(err, {
            status: 500
        })
    }
}