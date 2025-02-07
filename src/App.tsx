
import { Routes, Route } from 'react-router-dom'
import './global.css'
import { Toaster } from "@/components/ui/toaster"
import SignIn from './_auth/forms/SignIn'
import { Allusers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import SignUp from './_auth/forms/SignUp'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'


const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>

            {/* Public routes */}
            <Route element={<AuthLayout/>}>
                 <Route path='/sign-in' element={<SignIn/>}/> 
                 <Route path='/sign-up' element={<SignUp/>}/> 
            </Route>



            {/* Private routes */}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='/explore' element={<Explore/>}/>
                <Route path='/saved' element={<Saved/>}/>
                <Route path='/all-users' element={<Allusers/>}/>
                <Route path='/create-post' element={<CreatePost/>}/>
                <Route path='/update-post/:id' element={<EditPost/>}/>
                <Route path='/posts/:id' element={<PostDetails/>}/>
                <Route path='/profile/:id/*' element={<Profile/>}/>
                <Route path='/update-profile/:id/' element={<UpdateProfile/>}/>
            </Route>
        </Routes>
        <Toaster/>
    </main>
  )
}

export default App

