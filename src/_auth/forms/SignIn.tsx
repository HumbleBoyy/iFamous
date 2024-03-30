
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidation } from '@/lib/validation';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthConext';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { z } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
const SignIn = () => {

  const { toast } = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  
   
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount()
  // 1. Define your form.
    const form = useForm<z.infer<typeof signInValidation>>({
      resolver: zodResolver(signInValidation),
      defaultValues: {
        email:"",
        password:""
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signInValidation>) {

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
    <div>
         <Form {...form}>

<div className="sm:w-420 flex-center flex-col">
 <div className="flex justify-center items-center">
 <FontAwesomeIcon icon={faCamera} size='2xl' style={{color: "#f3123f",}} className="w-200" /><h1 className="ml-2 font-semibold text-[36px]"><span className="shad-form_message">i</span>Famous</h1>
 </div>

     <h2 className="h3-bold md:h2-bold pt-5 sm:12">Sign In to your account</h2>
     <p className="personal-color small-medium md:base-regular mt-2">Please confirm your personal account!</p>

<form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
 
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
     {isUserLoading ? (
          <div className="flex-center gap-2">
             <Loader/>
          </div>
     ): "Sign In"}
  </Button>
  <p className="text-small-regular text-light-2 text-center mt-2">
     Do not have an account?
      <Link to={'/sign-up'} className="text-primary-500 text-small-semibold ml-2">Sign Up</Link>
  </p>
</form>
</div>
</Form>
    </div>
  )
}

export default SignIn
