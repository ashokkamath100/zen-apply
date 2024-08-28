import { z } from 'zod';

export const resumeSchema = z.object({
    resume: z.instanceof(File).refine((file) => file.size > 0, {
        message: "Resume file is required"
    })
})