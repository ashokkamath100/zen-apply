"use server";
import { dbConnect } from "@/lib/mongodbConn";
//import { User } from "@/mongoose/User";
//import { IWorkExperience } from "@/mongoose/WorkExperience";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("no session");
    return {
      message: "You ain't authorized",
    };
  }
  console.log(session.user);
  const email = session.user.email; // Adjusted to session.user.email directly if your session object has this format
  console.log("username: " + email);

  const db = await dbConnect();
  const users = db.collection("users");

  let user = await users.findOne({ email }); //User.findOne({ email });
  return { user, email };
};

export async function saveResume(
  formState: { message: string },
  formData: FormData
) {
  console.log("saveProfileInfo running");
  try {
    const { user, email } = await getUser();
    if (!user) {
      console.log("did not find user");
      return {
        message: "User not found",
      };
    } else {
      console.log("found user: " + user);

      const resume = formData.get('resume') as File | null ; 

      const db = await dbConnect();
      const collection = db.collection("users");

      // const updateResult = await User.updateOne(
      //   { email: email },
      //   {
      //     $set: {
      //       "profile.firstName": firstName,
      //       "profile.lastName": lastName,
      //     },
      //   }
      // );
      const updateResult = await collection.updateOne(
        { email: email },
        {
          $set: {
            "profile.resume": resume,
          },
        }
      );

      if (updateResult.matchedCount === 0) {
        console.log("Update failed: User not found or update unsuccessful");
        return {
          message: "Failed to update profile",
        };
      }
      const updatedUser = await collection.findOne(
        { email: email },
        { projection: { "profile.resume": 1} }
      );

      if (updatedUser) {
        console.log("updatedUser: " + JSON.stringify(updatedUser));
        return {
          message: "User info updated successfully",
        };
      } else {
        console.log("Failed to update user");
        return {
          message: "Failed to update user",
        };
      }

    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An unknown error occurred",
      };
    }
  }

}


export async function saveProfileInfo(
  formState: { message: string },
  formData: FormData
) {
  console.log("saveProfileInfo running");
  try {
    const { user, email } = await getUser();
    if (!user) {
      console.log("did not find user");
      return {
        message: "User not found",
      };
    } else {
      console.log("found user: " + user);

      const firstName = formData.get("firstName") as string | null;
      const lastName = formData.get("lastName") as string | null;
      console.log(firstName, lastName);

      const updateData: { [key: string]: any } = {};
      if (firstName !== null) updateData["profile.firstName"] = firstName;
      if (lastName !== null) updateData["profile.lastName"] = lastName;

      // const updatedUser = await User.findOneAndUpdate(
      //   { email: email },
      //   { $set: updateData },
      //   { new: true }
      // );
      const db = await dbConnect();
      const collection = db.collection("users");

      // const updateResult = await User.updateOne(
      //   { email: email },
      //   {
      //     $set: {
      //       "profile.firstName": firstName,
      //       "profile.lastName": lastName,
      //     },
      //   }
      // );
      const updateResult = await collection.updateOne(
        { email: email },
        {
          $set: {
            "profile.firstName": firstName,
            "profile.lastName": lastName,
          },
        }
      );

      if (updateResult.matchedCount === 0) {
        console.log("Update failed: User not found or update unsuccessful");
        return {
          message: "Failed to update profile",
        };
      }

      //const updatedUser = await User.findOne({ email }).select("profile");
      const updatedUser = await collection.findOne(
        { email: email },
        { projection: { "profile.firstName": 1, "profile.lastName": 1 } }
      );

      if (updatedUser) {
        console.log("updatedUser: " + JSON.stringify(updatedUser));
        return {
          message: "User info updated successfully",
        };
      } else {
        console.log("Failed to update user");
        return {
          message: "Failed to update user",
        };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An unknown error occurred",
      };
    }
  }
}

export async function saveContactInfo(
  formState: { message: string },
  formData: FormData
) {
  try {
    const { user, email } = await getUser();
    if (!user) {
      console.log("did not find user");
      return {
        message: "User not found",
      };
    } else {
      const db = await dbConnect();
      const users = db.collection("users");

      console.log("found user: " + user);

      const contactEmail = formData.get("contactEmail") as string | null;
      const phoneNumber = formData.get("phoneNumber") as string | null;
      const address = formData.get("address") as string | null;
      console.log(contactEmail, phoneNumber, address);

      const updatedUser = await users.updateOne(
        { email: email },
        {
          $set: {
            "profile.contactEmail": contactEmail,
            "profile.phoneNumber": phoneNumber,
            "profile.address": address
          },
        }
      );

      if (updatedUser) {
        console.log("updatedUser: " + updatedUser);
        return {
          message: "User info updated successfully",
        };
      } else {
        console.log("Failed to update user");
        return {
          message: "Failed to update user",
        };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An unknown error occurred",
      };
    }
  }
}

export async function saveWorkExperience(
  formState: { message: string },
  formData: FormData
) {
  try {
    console.log('save work experience triggered') ;
    //console.log('formData: ' + JSON.stringify(formData)) ; 
    const { user, email } = await getUser();
    if (!user) {
      console.log("did not find user");
      return {
        message: "User not found",
      };
    } else {
      const db = await dbConnect();
      const users = db.collection("users");
      console.log("found user: " + user);

      const workExpId = formData.get("workExpId") as number;
      const company = formData.get("company") as string | null;
      const location = formData.get("location") as string | null;
      const positionTitle = formData.get("positionTitle") as string | null;
      const experienceType = formData.get("experienceType") as string | null;
      const startMonth = formData.get("startMonth") as string | null;
      const startYear = formData.get("startYear") as string | null;
      const endMonth = formData.get("endMonth") as string | null;
      const endYear = formData.get("endYear") as string | null;
      const description = formData.get("description") as string | null;
      console.log('description: ', description) ; 


      console.log(workExpId, company, location, positionTitle, experienceType, startMonth, startYear, endMonth, endYear);

      const updateData: { [key: string]: any } = {};
      if (company !== null) updateData.company = company;
      if (location !== null) updateData.location = location;
      if (positionTitle !== null) updateData.positionTitle = positionTitle;
      if (experienceType !== null) updateData.company = company;
      if (startMonth !== null) updateData.startMonth = startMonth;
      if (startYear !== null) updateData.startYear = startYear;
      if (endMonth !== null) updateData.endMonth = endMonth;
      if (endYear !== null) updateData.endYear = endYear;
      if (description !== null) updateData.description = description;


      // const newExperience: IWorkExperience = {
      //   id,
      //   company: company || "",
      //   location: location || "",
      //   positionTitle: positionTitle || "",
      //   experienceType: experienceType || "",
      //   startMonth: startMonth || "",
      //   startYear: startYear || "",
      //   endMonth: endMonth || "",
      //   endYear: endYear || "",
      //   description: (formData.get("description") as string) || "",
      // };



      const updatedUser1 = await users.updateOne(
        { email: email, "profile.workExperiences.id": { $ne: workExpId } },
        {
          $addToSet: {
            "profile.workExperiences": {
              id: workExpId,
              company: company,
              location: location,
              positionTitle: positionTitle,
              experienceType: experienceType,
              startMonth: startMonth,
              startYear: startYear,
              endMonth: endMonth,
              endYear: endYear,
              description: description
            }
          }
        }
      );

      const updatedUser2 = await users.updateOne(
        { email: email, "profile.workExperiences.id": workExpId },
        {
          $set: {
            "profile.workExperiences.$.company": company,
            "profile.workExperiences.$.location": location,
            "profile.workExperiences.$.positionTitle": positionTitle,
            "profile.workExperiences.$.experienceType": experienceType,
            "profile.workExperiences.$.startMonth": startMonth,
            "profile.workExperiences.$.startYear": startYear,
            "profile.workExperiences.$.endMonth": endMonth,
            "profile.workExperiences.$.endYear": endYear,
            "profile.workExperiences.$.description": description,
          }
        }
      );


      const existingExperience = user.workExperiences.find(
        (exp) => Number(exp.id) === id
      );

      if (existingExperience) {
        // Update existing work experience
        console.log("existing work experience");
        await User.findOneAndUpdate(
          { email, "workExperiences.id": id },
          {
            $set: {
              "workExperiences.$": newExperience,
            },
          },
          { new: true }
        );
      } else {
        // Add new work experience
        console.log("new work experience");
        await User.findOneAndUpdate(
          { email },
          {
            $push: { workExperiences: newExperience },
          },
          { new: true }
        );
        console.log("did we finish the workExpUpdate?");
      }

      // Retrieve the updated user
      const updatedUser = await User.findOne({ email }).select(
        "-password -createdAt -updatedAt"
      );

      console.log("updatedUser: " + updatedUser);

      return {
        message: "User work experience updated successfully",
        user: updatedUser,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An unknown error occurred",
      };
    }
  }
}
