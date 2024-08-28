import {z} from "zod" ; 

export const profileCardSchema = z.object({
    firstName: z.string().trim().min(1, {
        message: "First name is required"
    }),
    lastName: z.string().trim().min(1, {
        message: "Last name is required"
    }),
})