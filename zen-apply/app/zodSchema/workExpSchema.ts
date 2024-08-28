import {z} from "zod" ; 

export const workExpSchema = z.object({
    company: z.string().trim().min(1, {
        message: "Company is required"
    }),
    location: z.string().trim().min(1, {
        message: "Location is required"
    }),
    positionTitle: z.string().trim().min(1, {
        message: "Position title is required"
    }),
    experienceType: z.string().trim().min(1, {
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
    description: z.string().trim().min(0, {
        message: "End year not required"
    }),
})