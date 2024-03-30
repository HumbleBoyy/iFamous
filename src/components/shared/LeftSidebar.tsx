import { sidebarLinks } from '@/constants'
import { useUserContext } from '@/context/AuthConext'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { INavLink } from '@/types'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'

const LeftSidebar = () => {
    const {mutate: SignOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {user} = useUserContext()

    useEffect(()=> {
        if(isSuccess)navigate(0);
    },[isSuccess])


  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
        <Link to='/' className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faCamera} size='2xl' style={{color: "#f3123f",}} className="w-200" /><h1 className="ml-2 font-semibold text-[36px]"><span className="shad-form_message">i</span>Famous</h1>
          </Link>
          <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
              <img src={user.imageUrl} alt={user.username} className='h-12 w-12 rounded-full' />
              <div className='flex flex-col'>
                 <p className='body-bold'>
                 {user.name}  
                 </p>
                 <p className=' text-light-3 text-[12px]'>
                    @{user.username}
                 </p>
              </div>
          </Link>


       <ul className='flex flex-col gap-6'>
            
              {sidebarLinks.map((link: INavLink)=> {
                const isActive = pathname === link.route
                 return(
                    <li 
                     key={link.label}
                    className={`leftsidebar-link ${isActive && 'bg-primary-500'}`}
                    >
                    <NavLink to={link.route}
                     className="flex gap-4 items-center p-4"
                    >
                        <img
                          src={link.imgURL}
                          alt={link.label}
                          className='text-light-3'
                        />
                        {link.label}
                      
                    </NavLink>
                    </li>
                 )
              })}
          </ul>
          <ul>
          <Button variant='ghost' className='shad-button_ghost' onClick={()=> SignOut()}>
                <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#d20f49",}} size='2xl' />
                <p className='small-medium'>Log out</p>
          </Button>
          </ul>
        </div>
    </nav>
  )
}

export default LeftSidebar
