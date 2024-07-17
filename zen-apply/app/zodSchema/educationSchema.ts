import {z} from "zod" ; 

export const educationSchema = z.object({
    school: z.string().trim().min(1, {
        message: "Company is required"
    }),
    major: z.string().trim().min(1, {
        message: "Location is required"
    }),
    degreeType: z.string().trim().min(1, {
        message: "Position title is required"
    }),
    GPA: z.string().trim().min(1, {
        message: "Experience type is required"
    }),
    startMonth: z.string().trim().min(1, {
        message: "Start month is required"
    }),
    startYear: z.string().trim().min(1, {
        message: "Start year is required"
    }),
    endMonth: z.string().trim().min(0, {
        message: "End month not required"
    }),
    endYear: z.string().trim().min(0, {
        message: "End year not required"
    }),
})