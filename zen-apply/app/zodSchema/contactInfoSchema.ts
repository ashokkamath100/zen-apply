import {z} from "zod" ; 

export const contactInfoSchema = z.object({
    contactEmail: z.string().trim().min(1, {
        message: "Email is required"
    }),
    phoneNumber: z.string().trim().min(1, {
        message: "Phone Number is required"
    }),
    address: z.string().trim().min(1, {
        message: "Address is required"
    }),
})