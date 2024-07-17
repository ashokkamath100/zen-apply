import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from 'next-auth' ;
import GithubProvider from "next-auth/providers/github" ; 
import CredentialsProvider from "next-auth/providers/credentials";
//import { User } from "@/mongoose/User";
import {dbConnect} from "@/lib/mongodbConn";
import bcrypt from "bcryptjs" ; 

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: any) {
                const db = await dbConnect() ; 
                try {
                    console.log("credentials.email: " + credentials.email) ; 
                    console.log("credentials.password: " + credentials.password) ; 

                    //const user = await User.findOne({email: credentials.email}) ; 
                    const collection = db.collection('users');

                    const users = await collection.find({}, { projection: { email: 1 } }).toArray();

                    // Extract emails from the documents
                    const emails = users.map(user => user.email);
                    console.log("emails: " + emails) ; 

                    const user = await collection.findOne({ email: credentials.email }) ; //, { projection: { 'profile.workExperiences': 1} });
                  
                    
                    console.log("user password: " + user) ; 
                    if(user) {
                        //const userJS = user?.toObject() ; 
                        console.log("found user") ; 
                        //return user ; 
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        console.log('isPasswordCorrect: ' + isPasswordCorrect) ; 
                        if(isPasswordCorrect){
                            return user ; 
                        }
                    }
                }catch(error: any){
                    throw new Error(error) ; 
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        //add more providers here 
    ],
    callbacks: {
        async signIn({user, account}: {user: AuthUser, account: Account}){
            if(account?.provider == "credentials") {
                return true 
            }
            if(account?.provider == "github"){
                await connect() ; 
                try {
                    const existingUser = await User.findOne({email: user.email}) ; 
                    if(!existingUser){
                        const newUser = new User({email: user.email}) ;
                        await newUser.save() ; 
                        return true ;  
                    } ; 
                    
                } catch(err) {
                    console.log("Error saving user", err) ; 
                    return false ; 
                }
            }
        },
        async jwt({ user , token }) {
            if (user) {  // Note that this if condition is needed
              token.user={...user}
            }
            return token
           },
        async session({ session, token }) {
            if (token?.user) { // Note that this if condition is needed
              session.user = token.user;
            }
            console.log("in session for auth options")
            return session
          },
    }
}

export const handler = NextAuth(authOptions) ;
export {handler as GET, handler as POST} ; 