import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { signUpValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import {  useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import {  createUserAccount } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthConext";


const SignUp = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const {mutateAsync: createUserAccount, isPending:isCreatingAccount} = useCreateUserAccount()
   
  const {mutateAsync: signInAccount} = useSignInAccount()
  // 1. Define your form.
    const form = useForm<z.infer<typeof signUpValidation>>({
      resolver: zodResolver(signUpValidation),
      defaultValues: {
        name:"",
        username: "",
        email:"",
        password:""
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpValidation>) {
       const newUser = await createUserAccount(values);
      
          if(!newUser){
            return   toast({
              title: "Something went wrong, Please try again!",
            });
          }

          const session = await signInAccount({
            email: values.email,
            password: values.password
          })
          if(!session){
            return toast({title:"Something went wrong, Please try again!"})
          }

          const isLoggedIn = await checkAuthUser();

          if(isLoggedIn){
            form.reset();
            navigate('/')
          }else{
           return toast({title:"Something went wrong, Please try again!"})
          }
    }

  return (
    <>
     <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
       <div className="flex justify-center items-center">
       <FontAwesomeIcon icon={faCamera} size='2xl' style={{color: "#f3123f",}} className="w-200" /><h1 className="ml-2 font-semibold text-[36px]"><span className="shad-form_message">i</span>Famous</h1>
       </div>

           <h2 className="h3-bold md:h2-bold pt-5 sm:12">Create a new account</h2>
           <p className="personal-color small-medium md:base-regular mt-2">To use <span className="shad-form_message">i</span>Famous, please create a personal account!</p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className="shad-form_message "/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className="shad-form_message "/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" className="shad-input" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage className="shad-form_message "/>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" className="shad-input" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage  className="shad-form_message "/>
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary w-full">
           {isCreatingAccount ? (
                <div className="flex-center gap-2">
                   <Loader/>
                </div>
           ): "Sign Up"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to={'/sign-in'} className="text-primary-500 text-small-semibold ml-2">Sign In</Link>
        </p>
      </form>
      </div>
    </Form>
    </>
  )
}

export default SignUp
