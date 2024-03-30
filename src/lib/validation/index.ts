import { z } from "zod";

export const signUpValidation = z.object({
    name: z.string().min(4, {message:'Name must be more than 4 characters'}).max(50, {message:"Name must be less than 50 characters"}),
    username: z.string().min(4, {message:"Username must be more than 4 characters"}).max(50,{message:"Username must be less than characters"}),
    email: z.string().email(),
    password: z.string().min(8, {message:'Password must be more than 8 characters'})
  })

  export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message:'Password must be more than 8 characters'})
  })

  export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
  });